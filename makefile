.PHONY: default lint test build

default: deps-node

test-watch: deps-node
	docker-compose run --rm app npm test:watch

test: deps-node
	docker-compose run --rm app npm test

build: deps-node
	docker-compose run --rm app npm run build

demo: deps-node
	docker-compose run --rm app npm run build:demo

################################################################################
# Node

.PHONY: deps-node clean-deps-node
NODE_BINS = node_modules/.bin

$(NODE_BINS): node_modules

node_modules: package.json
	docker-compose run --rm app npm install -q --no-optional --unsafe-perm
	@touch node_modules
	@touch $(NODE_BINS)

deps-node: $(NODE_BINS)


