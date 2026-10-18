# Renders Obsidian-flavored wiki pages for the Jekyll site:
#   [[page]] / [[page|label]] / [[page#heading]]  -> links (missing targets get a "broken" style)
#   > [!warning] Title                           -> callout boxes
# Also derives page titles from the first "# Heading" and computes backlinks ("Linked from").

module Obsidian
  # Code fences and inline code are matched first so wikilinks inside them stay literal.
  CODE_OR_WIKILINK = /(```.*?```|`[^`\n]*`)|\[\[([^\]|#]+)(#[^\]|]*)?(?:\|([^\]]+))?\]\]/m
  CALLOUT_HTML = %r{<blockquote>\s*<p>\[!(\w+)\][ \t]*([^\n<]*)\n?}

  def self.wiki_pages(site)
    site.pages.select { |p| p.path.start_with?("wiki/") && p.ext == ".md" }
  end

  def self.page_name(page)
    File.basename(page.path, ".md")
  end

  class Generator < Jekyll::Generator
    priority :high

    def generate(site)
      pages = Obsidian.wiki_pages(site)
      by_name = pages.to_h { |p| [Obsidian.page_name(p), p] }
      backlinks = Hash.new { |h, k| h[k] = [] }

      pages.each do |page|
        page.data["title"] ||= page.content[/^# (.+)$/, 1] ||
                               Obsidian.page_name(page).tr("-", " ").capitalize
      end

      pages.each do |page|
        source = Obsidian.page_name(page)
        page.content = page.content.gsub(CODE_OR_WIKILINK) do
          next Regexp.last_match(1) if Regexp.last_match(1)

          target, anchor, label = Regexp.last_match(2).strip, Regexp.last_match(3), Regexp.last_match(4)
          text = label || target
          if (linked = by_name[target])
            backlinks[target] << source unless target == source || backlinks[target].include?(source)
            %(<a class="wikilink" href="#{site.config['baseurl']}#{linked.url}#{anchor_slug(anchor)}">#{text}</a>)
          else
            %(<span class="wikilink broken" title="No page yet">#{text}</span>)
          end
        end
      end

      pages.each do |page|
        page.data["backlinks"] = backlinks[Obsidian.page_name(page)].sort.map do |name|
          { "title" => by_name[name].data["title"], "url" => by_name[name].url }
        end
      end
    end

    private

    def anchor_slug(anchor)
      return "" unless anchor && anchor.length > 1
      "#" + Jekyll::Utils.slugify(anchor[1..])
    end
  end
end

Jekyll::Hooks.register :pages, :post_convert do |page|
  next unless page.path.start_with?("wiki/")

  page.content = page.content.gsub(Obsidian::CALLOUT_HTML) do
    kind = Regexp.last_match(1).downcase
    title = Regexp.last_match(2).strip
    title = kind.capitalize if title.empty?
    %(<blockquote class="callout callout-#{kind}"><p class="callout-title">#{title}</p><p>)
  end
end
