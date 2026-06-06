# Static site served by nginx. Serving over HTTP (not file://) is required
# for the YouTube embed to load — it rejects embeds with no valid origin.
FROM nginx:alpine

# Copy the static site into nginx's web root.
COPY . /usr/share/nginx/html

EXPOSE 80
