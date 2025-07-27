FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o main .

RUN chmod +x entrypoint.sh

ENV PORT=3333

EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]