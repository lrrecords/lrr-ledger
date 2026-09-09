FROM alpine:3.20

RUN apk add --no-cache ca-certificates unzip curl

WORKDIR /pb

RUN LATEST_URL=$(curl -s https://api.github.com/repos/pocketbase/pocketbase/releases/latest \
      | grep "browser_download_url.*linux_amd64.zip" \
      | cut -d '"' -f 4) \
    && curl -L -o /tmp/pb.zip "$LATEST_URL" \
    && unzip /tmp/pb.zip -d /pb/ \
    && rm /tmp/pb.zip

EXPOSE 8080
CMD ["sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT:-8080}"]
