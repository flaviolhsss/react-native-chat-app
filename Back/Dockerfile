FROM node:21

RUN apt-get update && \
    apt-get install -y curl iproute2 net-tools && \
    apt-get install -y iputils-ping && \
    apt-get install -y iproute2 && \
    apt-get install -y sudo && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "start" ]
