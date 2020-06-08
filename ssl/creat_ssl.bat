@echo off
openssl req -new -newkey rsa:2048 -nodes -keyout ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out cert.crt