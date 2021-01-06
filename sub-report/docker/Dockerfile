FROM nginx:1.17.9-alpine

RUN echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories

COPY nmnginx.conf /etc/nginx/nginx.conf

COPY html /usr/share/nginx/html/

ENV LANG=UTF-8

ENV TZ=Asia/Shanghai

ENTRYPOINT ["nginx", "-g", "daemon off;"]

