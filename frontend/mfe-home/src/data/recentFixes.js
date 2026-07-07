// Preview of the first 6 fixes for the homepage teaser section.
// Full fixes list lives with mfe-fixes when that's built.
export const recentFixes = [
  { slug: "docker-container-exits-immediately", title: "Container exits immediately after start", tags: ["Docker"], summary: "Container starts but exits within seconds. docker ps shows nothing." },
  { slug: "docker-permission-denied-sock", title: "permission denied: /var/run/docker.sock", tags: ["Docker", "Linux"], summary: "Running docker commands fails with permission denied on the socket." },
  { slug: "docker-build-cache-stale", title: "Docker build using stale cache after code change", tags: ["Docker"], summary: "Image rebuilds skip your code changes and serve old content." },
  { slug: "docker-container-cannot-reach-host", title: "Container cannot reach host or other containers", tags: ["Docker"], summary: "App inside container fails to connect to localhost or sibling containers." },
  { slug: "docker-image-size-too-large", title: "Docker image is several GB — much larger than expected", tags: ["Docker"], summary: "Built image is 2-3x bigger than it needs to be." },
  { slug: "docker-env-variable-not-available", title: "Environment variable not available inside container", tags: ["Docker"], summary: "App inside container cannot read env variables you set on the host." },
];
