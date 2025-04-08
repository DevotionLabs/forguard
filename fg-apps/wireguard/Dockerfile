ARG WIREGUARD_VERSION
FROM linuxserver/wireguard:${WIREGUARD_VERSION}

RUN apk update && apk add dnsmasq

COPY dnsmasq.conf /etc/dnsmasq.conf