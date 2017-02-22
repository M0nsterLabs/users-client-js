


build: build-js build-doc


build-js:
	npm run build

build-doc:
	npm run doc

release:
	npm run release
	npm publish


clean:
	npm run clean
