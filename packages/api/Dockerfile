FROM node:18.17.0-alpine

RUN apk add --no-cache bash
RUN yarn add -g @nestjs/cli typescript ts-node

#COPY package*.json /tmp/app/
#COPY .env /usr/src/app/


COPY ./packages/api /usr/src/app
RUN cd /usr/src/app && yarn install
#RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./packages/api/wait-for-it.sh /opt/wait-for-it.sh
COPY ./packages/api/startup.dev.sh /opt/startup.dev.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.dev.sh
#
WORKDIR /usr/src/app
RUN if [ ! -f .env ]; then cp env-example .env; fi
RUN yarn run build
#
CMD ["/opt/startup.dev.sh"]
