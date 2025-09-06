FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files từ thư mục order
COPY payment/package*.json ./
RUN npm install

# Copy source code từ thư mục order
COPY payment/ .

# Copy proto chung từ root
COPY proto ./proto

RUN npm run build

RUN mkdir -p dist/proto && cp -r proto/* dist/proto/

CMD ["node", "dist/main"]