FROM node
WORKDIR /product
COPY ["package.json","package-lock.json*", "/product/"]
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start"]