FROM node:7.8.0

# The base node image sets a very verbose log level.
#ENV NPM_CONFIG_LOGLEVEL warn

# In your Dockerfile.
COPY . .

#RUN npm install webpack
#RUN npm install webpack-cli -D
RUN npm install
RUN npm run build --production
RUN npm install serve -g

ENV NODE_ENV=production
CMD serve -s dist

EXPOSE 5000