#----------------------------------------------------------------------------#
#-                                 HELP                                     -#
#----------------------------------------------------------------------------#

.DEFAULT_GOAL := help
help:
	@printf "\n"; \
	printf "\n";

.PHONY: init
init:
	@printf "\n#----------------------------------------------------------#\n"; \
	printf    "#-                          INIT                            -#\n"; \
	printf    "#----------------------------------------------------------#\n"; \
	for template in .env.template ./*/.env.template; do \
    	if [ -f "$$template" ]; then \
    	  env_file="$${template%.template}"; \
    	  if [ ! -f "$$env_file" ]; then \
    	    echo "Create $$env_file file from $$template"; \
    		cp "$$template" "$$env_file"; \
    	  else \
    	    echo "$$env_file exist !"; \
    	  fi \
    	fi \
  	done; \
	chmod +x generate-mongo-init.sh; \

.PHONY: up
up:
	@printf "\n#----------------------------------------------------------#\n"; \
	printf    "#-                          UP                            -#\n"; \
	printf    "#----------------------------------------------------------#\n"; \
	./generate-mongo-init.sh; \
	docker-compose up -d --build; \

.PHONY: down
down:
	@printf "\n#----------------------------------------------------------#\n"; \
	printf    "#-                          DOWN                          -#\n"; \
	printf    "#----------------------------------------------------------#\n"; \
	docker-compose down;

.PHONY: down-v
down-v:
	@printf "\n#----------------------------------------------------------#\n"; \
	printf    "#-                        DOWN RM                         -#\n"; \
	printf    "#----------------------------------------------------------#\n"; \
	docker-compose down --volumes;
