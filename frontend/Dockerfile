FROM node:14 
WORKDIR /app
COPY . .
RUN npm install 
ENV PORT 3000
ENTRYPOINT ["npm","start"]