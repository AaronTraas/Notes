run: 
	bundle exec jekyll serve

clean:
	rm -rf _site

dep: dependencies
deps: dependencies
dependencies:
	bundle install

check-links:
links:
check:
	linkchecker https://aarontraas.github.io/Notes/

check-links-local:
links-local:
check-local:
	linkchecker http://127.0.0.1:4000/
