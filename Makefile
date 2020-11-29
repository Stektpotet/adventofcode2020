# Example: "make test DAY=day-03"
test:
	./scripts/print-versions.sh;
	./$(DAY)/test.sh

test-all:
	for i in $$(ls | grep day-); do "./$$i/test.sh"; done

dockerbuild: Dockerfile
	docker build . --tag jonasjso/adventofcode2020

dockerpush:
	docker push jonasjso/adventofcode2020:latest

versions:
	./scripts/print-versions.sh

.PHONY: dockerbuild dockerpush test test-all versions
