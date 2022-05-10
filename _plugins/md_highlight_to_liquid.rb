# Jekyll plugin to replace Markdown image syntax with HTML markup, written to work combined with Jekyll Picture Tag
# Kinoute - https://github.com/jekyll/jekyll/issues/8621#issuecomment-846421195

Jekyll::Hooks.register :documents, :pre_render do |document, payload|
  docExt = document.extname.tr('.', '')

  # only process if we deal with a markdown file
  if payload['site']['markdown_ext'].include? docExt
    # {5}
    # ```js
    # (to not break syntax highlighting while writing)
    document.content.gsub!(/^{([\d\s]+)}\n^\`\`\`([A-z0-9]+)$(.*?)^\`\`\`$/im, '{% highlight \2 highlight_lines="\1" %}\3{% endhighlight %}')
  end
end