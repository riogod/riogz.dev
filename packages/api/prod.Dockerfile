FROM node:18.14.2-alpine

RUN apk add --no-cache bash
RUN yarn add -g @nestjs/cli typescript ts-node

COPY ./packages/api /usr/src/app
RUN cd /usr/src/app && yarn install

COPY ./packages/api/wait-for-it.sh /opt/wait-for-it.sh
COPY ./packages/api/startup.ci.sh /opt/startup.ci.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.ci.sh
#
WORKDIR /usr/src/app
RUN if [ ! -f .env ]; then cp env-example .env; fi
RUN yarn run build

CMD ["/opt/startup.ci.sh"]
