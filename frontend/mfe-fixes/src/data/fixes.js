export const fixes = [
  {
    "slug": "docker-container-exits-immediately",
    "title": "Container exits immediately after start",
    "tags": [
      "Docker"
    ],
    "summary": "Container starts but exits within seconds. docker ps shows nothing.",
    "issue": "You run `docker run myapp` and the container stops immediately. `docker ps` is empty.",
    "cause": "Docker containers only live as long as their PID 1 process. If your CMD finishes, exits, or crashes due to a missing env variable, the container dies with it.",
    "fix": [
      "Check logs: `docker logs <container_id>`",
      "Run interactively to debug: `docker run -it myapp /bin/sh`",
      "Make sure CMD runs in the foreground. Wrong: `service nginx start` — Right: `nginx -g \"daemon off;\"`",
      "Check for missing required env variables that cause the app to crash on startup"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "docker-permission-denied-sock",
    "title": "permission denied: /var/run/docker.sock",
    "tags": [
      "Docker",
      "Linux"
    ],
    "summary": "Running docker commands fails with permission denied on the socket.",
    "issue": "`docker ps` fails: `Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock`",
    "cause": "Only root and members of the `docker` group can access the socket. Your user is in neither.",
    "fix": [
      "Add user to docker group: `sudo usermod -aG docker $USER`",
      "Log out and back in (or reconnect SSH) — group changes only apply to new sessions",
      "Verify: run `groups` and confirm `docker` appears",
      "Test: `docker ps` should now work without sudo"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "docker-build-cache-stale",
    "title": "Docker build using stale cache after code change",
    "tags": [
      "Docker"
    ],
    "summary": "Image rebuilds skip your code changes and serve old content.",
    "issue": "You changed app code, rebuilt the image, but the running container still serves old behaviour.",
    "cause": "Docker caches each layer. If `COPY` comes before `RUN npm install`, any code change busts all layers. But if `COPY . .` is too early and your Dockerfile is ordered badly, you may be copying stale files or running with an old base.",
    "fix": [
      "Order Dockerfile correctly: COPY package*.json first, RUN npm install, then COPY . . — so code changes only bust the last layer",
      "Force a full rebuild when needed: `docker build --no-cache -t myapp .`",
      "Confirm the new image is being used: `docker inspect <container> | grep Image`",
      "Make sure you stopped the old container before running the new one"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "docker-container-cannot-reach-host",
    "title": "Container cannot reach host or other containers",
    "tags": [
      "Docker"
    ],
    "summary": "App inside container fails to connect to localhost or sibling containers.",
    "issue": "App inside container tries to connect to `localhost:5432` (postgres) but gets connection refused.",
    "cause": "Inside a container, `localhost` refers to the container itself, not the host machine. Sibling containers are also not reachable via `localhost`.",
    "fix": [
      "For host services on Linux: use `172.17.0.1` (default docker bridge gateway) or `--network host`",
      "For sibling containers: use Docker Compose and reference by service name, e.g. `postgres:5432`",
      "Check which network the container is on: `docker inspect <container> | grep NetworkMode`",
      "Use `docker network ls` and `docker network inspect bridge` to see connected containers and their IPs"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "docker-image-size-too-large",
    "title": "Docker image is several GB — much larger than expected",
    "tags": [
      "Docker"
    ],
    "summary": "Built image is 2-3x bigger than it needs to be.",
    "issue": "`docker images` shows your app image is 2.5 GB. Pulls and deploys are slow.",
    "cause": "Common causes: using a full OS base image instead of alpine, including dev dependencies, not cleaning up apt/apk cache, COPY-ing unnecessary files like node_modules or .git.",
    "fix": [
      "Switch base image to alpine variant: `FROM node:20-alpine` instead of `FROM node:20`",
      "Use multi-stage builds: build in one stage, copy only the output to a clean stage",
      "Add `.dockerignore` to exclude `node_modules`, `.git`, `*.log`, `deploy/` etc.",
      "After apt-get install, always run: `rm -rf /var/lib/apt/lists/*` in the same RUN layer",
      "Check what is bloating the image: `docker history myapp:latest`"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "docker-env-variable-not-available",
    "title": "Environment variable not available inside container",
    "tags": [
      "Docker"
    ],
    "summary": "App inside container cannot read env variables you set on the host.",
    "issue": "You set `export DB_URL=postgres://...` on the host but `process.env.DB_URL` is undefined inside the container.",
    "cause": "Host environment variables are not automatically passed into containers. You must explicitly pass them.",
    "fix": [
      "Pass single vars: `docker run -e DB_URL=$DB_URL myapp`",
      "Pass a file: `docker run --env-file .env myapp`",
      "In Compose: use `environment:` or `env_file:` section under the service",
      "Verify inside the container: `docker exec <container> env | grep DB_URL`"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "docker-volume-changes-not-persisted",
    "title": "Data lost when container restarts",
    "tags": [
      "Docker"
    ],
    "summary": "Uploads or database data disappear every time the container is recreated.",
    "issue": "Users upload files, container restarts, all uploads are gone.",
    "cause": "Container filesystem is ephemeral. Anything written inside the container is lost when it is removed. You need a volume to persist data outside the container lifecycle.",
    "fix": [
      "Mount a host directory: `docker run -v /host/uploads:/app/uploads myapp`",
      "Or use a named volume: `docker run -v myapp_uploads:/app/uploads myapp`",
      "List volumes: `docker volume ls`",
      "Inspect where data lives: `docker volume inspect myapp_uploads`",
      "In Compose, define volumes under the service and the top-level `volumes:` key"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "docker-port-already-in-use",
    "title": "Port is already in use when starting container",
    "tags": [
      "Docker"
    ],
    "summary": "docker run fails because the host port is already bound.",
    "issue": "`docker run -p 3000:3000 myapp` fails: `Bind for 0.0.0.0:3000 failed: port is already allocated`",
    "cause": "Another process (or another container) is already listening on host port 3000.",
    "fix": [
      "Find what is using the port: `sudo ss -tlnp | grep 3000` or `lsof -i :3000`",
      "Stop the conflicting process or container",
      "Or map to a different host port: `docker run -p 3001:3000 myapp` (host:container)",
      "List running containers and their ports: `docker ps --format \"table {{.Names}}\t{{.Ports}}\"`"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "kubernetes-pod-crashloopbackoff",
    "title": "Pod stuck in CrashLoopBackOff",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Pod keeps restarting and never reaches Running state.",
    "issue": "`kubectl get pods` shows STATUS: CrashLoopBackOff with RESTARTS climbing.",
    "cause": "The container inside the pod is crashing. Kubernetes restarts it, it crashes again, and the backoff timer grows. Common causes: app crash on startup, missing env var, wrong command, missing file.",
    "fix": [
      "Check logs from the latest crash: `kubectl logs <pod> --previous`",
      "Describe the pod to see events: `kubectl describe pod <pod>`",
      "Common fix 1: add missing env var via ConfigMap or Secret and reference it in the Deployment",
      "Common fix 2: verify the container CMD/entrypoint is correct — test image locally first with `docker run`",
      "Common fix 3: if init containers are defined, check their logs too: `kubectl logs <pod> -c <init-container-name>`"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "kubernetes-imagepullbackoff",
    "title": "Pod stuck in ImagePullBackOff or ErrImagePull",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Kubernetes cannot pull the container image.",
    "issue": "`kubectl get pods` shows ErrImagePull or ImagePullBackOff. Pod never starts.",
    "cause": "Kubernetes cannot fetch the image. Usually: wrong image name/tag, private registry without credentials, or image was never pushed.",
    "fix": [
      "Check the exact error: `kubectl describe pod <pod>` and look at Events section",
      "Verify the image exists: `docker pull <image>:<tag>` from your local machine",
      "For private registries, create a Secret: `kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...`",
      "Reference the secret in your pod spec under `imagePullSecrets:`",
      "Check your Deployment YAML for typos in the image name or tag"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "kubernetes-service-not-reachable",
    "title": "Service is not reachable inside the cluster",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Pods cannot reach a Service by its DNS name or ClusterIP.",
    "issue": "Pod A tries to curl `http://my-service:8080` but gets connection refused or no route to host.",
    "cause": "Possible causes: Service selector does not match pod labels, wrong targetPort, no running pods backing the service, or CoreDNS issue.",
    "fix": [
      "Verify the service has endpoints: `kubectl get endpoints my-service` — if empty, selector is wrong",
      "Check label match: compare `kubectl get svc my-service -o yaml` selector with `kubectl get pods --show-labels`",
      "Test DNS resolution from inside a pod: `kubectl run tmp --image=busybox --rm -it -- nslookup my-service`",
      "Verify the targetPort matches the port your app listens on inside the container",
      "Check if backing pods are Running: `kubectl get pods -l app=my-service`"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "kubernetes-pending-pod-no-resources",
    "title": "Pod stuck in Pending — insufficient resources",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Pod never schedules because no node has enough CPU or memory.",
    "issue": "`kubectl get pods` shows STATUS: Pending for a long time. Pod never starts.",
    "cause": "No node in the cluster satisfies the pod resource requests. Either requests are too high or nodes are fully booked.",
    "fix": [
      "Check why it is pending: `kubectl describe pod <pod>` and read Events — look for \"Insufficient cpu\" or \"Insufficient memory\"",
      "Lower resource requests in your Deployment YAML if they are unrealistically high",
      "Check node capacity: `kubectl describe nodes | grep -A5 \"Allocated resources\"`",
      "Add more nodes to the cluster (or enable cluster autoscaler if on cloud)",
      "Check if any PodDisruptionBudgets or taints are blocking scheduling"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "kubernetes-secret-not-available-in-pod",
    "title": "Secret value is empty or unavailable in pod",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Environment variable backed by a Secret is empty inside the container.",
    "issue": "You defined an env var from a Secret in your Deployment, but inside the pod the variable is empty.",
    "cause": "Secret does not exist in the same namespace, key name is wrong, or Secret was not base64 encoded correctly when created manually.",
    "fix": [
      "Verify the secret exists: `kubectl get secret <secret-name> -n <namespace>`",
      "Check the key: `kubectl get secret <secret-name> -o jsonpath=\"{.data}\" | python3 -m json.tool`",
      "Decode to verify value: `kubectl get secret <secret-name> -o jsonpath=\"{.data.MY_KEY}\" | base64 -d`",
      "Ensure namespace matches — secrets are namespace-scoped",
      "After fixing the secret, restart the deployment: `kubectl rollout restart deployment/<name>`"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "kubernetes-oomkilled",
    "title": "Container killed with OOMKilled",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Container keeps dying because it exceeds its memory limit.",
    "issue": "`kubectl describe pod <pod>` shows `OOMKilled` in Last State. Pod restarts repeatedly.",
    "cause": "The container exceeded its `resources.limits.memory` and the kernel killed it. The limit is either too low for the workload or there is a memory leak.",
    "fix": [
      "Find how much memory the app actually uses: `kubectl top pods` (requires metrics-server)",
      "Increase the memory limit in your Deployment YAML — set limit slightly above peak observed usage",
      "Check for memory leaks in your application code",
      "Set both requests and limits: requests for scheduling, limits to cap runaway processes",
      "Monitor over time: `kubectl top pods --containers` to track per-container usage"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "kubernetes-ingress-404",
    "title": "Ingress returns 404 or does not route traffic",
    "tags": [
      "Kubernetes"
    ],
    "summary": "Ingress is created but traffic hits 404 or goes to the wrong backend.",
    "issue": "You created an Ingress resource but requests to your domain return 404.",
    "cause": "Common causes: Ingress controller not installed, wrong serviceName or servicePort in Ingress YAML, missing IngressClass annotation, or host header mismatch.",
    "fix": [
      "Verify ingress controller pods are running: `kubectl get pods -n ingress-nginx`",
      "Check your Ingress YAML: service name and port must exactly match the Service resource",
      "Add the correct IngressClass: `ingressClassName: nginx` (or whichever controller you use)",
      "Test without host matching first — remove the `host:` field to see if path routing works",
      "Check ingress controller logs: `kubectl logs -n ingress-nginx deploy/ingress-nginx-controller`"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "kubernetes-deployment-not-updating",
    "title": "Deployment update not rolling out — same old pods",
    "tags": [
      "Kubernetes"
    ],
    "summary": "You updated the image tag but pods still run the old version.",
    "issue": "`kubectl set image deployment/myapp myapp=myapp:v2` ran without error but pods are still running v1.",
    "cause": "If you use `latest` tag, Kubernetes will not pull a new image because the tag has not changed — it thinks nothing changed. Or the rollout is paused/stuck.",
    "fix": [
      "Never use `latest` in production — use explicit versioned tags like `myapp:1.4.2`",
      "Force re-pull for same tag (only for testing): add `imagePullPolicy: Always` to the container spec",
      "Check rollout status: `kubectl rollout status deployment/myapp`",
      "See rollout history: `kubectl rollout history deployment/myapp`",
      "If rollout is stuck, describe pods for errors: `kubectl describe pod <new-pod>`"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "linux-disk-full-no-space",
    "title": "Disk full — no space left on device",
    "tags": [
      "Linux"
    ],
    "summary": "Server throws \"no space left on device\" but du shows plenty of space.",
    "issue": "Writes fail with \"No space left on device\" but `df -h` shows only 60% used.",
    "cause": "Inodes exhausted, not disk blocks. Each file uses one inode regardless of size. Thousands of tiny files (logs, temp files, mail queue) can exhaust inodes while disk space looks fine.",
    "fix": [
      "Check inodes: `df -i` — if IUse% is near 100%, inodes are the problem",
      "Find directories with most files: `find / -xdev -type f | cut -d \"/\" -f 2 | sort | uniq -c | sort -rn | head`",
      "Common culprits: /var/spool/mail, /var/log, /tmp — clean up old files",
      "Delete old logs: `sudo journalctl --vacuum-time=7d` or `sudo find /var/log -name \"*.gz\" -delete`",
      "For actual disk full: find large files with `du -sh /* | sort -rh | head -20`"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "linux-process-wont-die",
    "title": "kill command does not stop the process",
    "tags": [
      "Linux"
    ],
    "summary": "Process keeps running after kill. Even kill -9 does not work.",
    "issue": "`kill <pid>` runs without error but the process is still listed in `ps aux`.",
    "cause": "`kill` without flags sends SIGTERM which the process can ignore or handle. A zombie process cannot be killed — it is already dead, waiting for its parent to call wait(). A process in uninterruptible sleep (D state) cannot be killed until the I/O completes.",
    "fix": [
      "Use SIGKILL: `kill -9 <pid>` — cannot be caught or ignored by the process",
      "Check process state first: `ps aux | grep <name>` — look at the STAT column",
      "If state is Z (zombie): kill the parent process instead",
      "If state is D (disk wait): wait for I/O to complete or check for hung NFS/disk",
      "Find PID by name: `pgrep -l nginx` or `pidof nginx`"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "linux-ssh-permission-denied",
    "title": "SSH: Permission denied (publickey)",
    "tags": [
      "Linux"
    ],
    "summary": "SSH login fails with publickey error even with correct key.",
    "issue": "`ssh user@host` returns: `Permission denied (publickey,gssapi-keyex,gssapi-with-mic)`",
    "cause": "SSH key not added to authorized_keys, wrong permissions on .ssh directory, or sshd not accepting the key type.",
    "fix": [
      "Check .ssh directory permissions on the server: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`",
      "Verify your public key is in authorized_keys: `cat ~/.ssh/authorized_keys`",
      "Add your key: `ssh-copy-id -i ~/.ssh/id_rsa.pub user@host`",
      "Check sshd config allows pubkey: `grep PubkeyAuthentication /etc/ssh/sshd_config` should be `yes`",
      "Debug with verbose mode: `ssh -vvv user@host` and look at which keys are tried"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "linux-high-cpu-process-not-visible",
    "title": "High CPU but no obvious process in top",
    "tags": [
      "Linux"
    ],
    "summary": "Server is slow and CPU is high but top does not show the culprit.",
    "issue": "`top` shows overall CPU at 90%+ but no single process shows high usage. Server is sluggish.",
    "cause": "CPU may be spent in kernel/system time (si, sy columns), many short-lived processes spawning too fast to catch, or a process running as a different user not visible with your permissions.",
    "fix": [
      "Check kernel vs user CPU split in top: press `1` to see per-core breakdown",
      "High `sy` (system) means kernel work — check for many syscalls: `strace -p <pid>`",
      "Catch short-lived processes: `ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head -20`",
      "Check if iowait is the real culprit (CPU waiting on disk): look at `wa` in top",
      "Use `perf top` for real-time kernel profiling on what is consuming CPU cycles"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "linux-cron-job-not-running",
    "title": "Cron job not running as expected",
    "tags": [
      "Linux"
    ],
    "summary": "Cron entry looks correct but the job never runs.",
    "issue": "You added a crontab entry but the script never executes at the scheduled time.",
    "cause": "Common causes: wrong cron syntax, script not executable, PATH is different in cron environment (no /usr/local/bin etc.), or output silently failing because cron has no mail configured.",
    "fix": [
      "Verify cron syntax at crontab.guru — paste your expression",
      "Make script executable: `chmod +x /path/to/script.sh`",
      "Redirect output to a log to capture errors: `* * * * * /path/script.sh >> /tmp/cron.log 2>&1`",
      "Use absolute paths inside the script — cron has a minimal PATH",
      "Check cron logs: `grep CRON /var/log/syslog | tail -20`",
      "Test the script manually as the cron user: `sudo -u www-data /path/script.sh`"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "linux-port-already-in-use",
    "title": "Port already in use — cannot start service",
    "tags": [
      "Linux"
    ],
    "summary": "Service fails to start because another process holds the port.",
    "issue": "Starting nginx/node/app fails with \"address already in use\" for port 80 or 3000.",
    "cause": "Another process is already listening on that port. Could be a zombie process, a previous instance that did not clean up, or a conflicting service.",
    "fix": [
      "Find what is using the port: `sudo ss -tlnp | grep :3000`",
      "Or: `sudo lsof -i :3000`",
      "Kill the conflicting process: `sudo kill -9 <pid>`",
      "If it is a systemd service: `sudo systemctl stop <service-name>`",
      "For nginx: check if another nginx instance is already running: `ps aux | grep nginx`"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "linux-file-permission-denied-root",
    "title": "Permission denied even as root",
    "tags": [
      "Linux"
    ],
    "summary": "Even with sudo you cannot write to a file.",
    "issue": "`sudo echo \"config\" > /etc/myapp.conf` returns permission denied.",
    "cause": "The shell redirect `>` runs as your user, not root. sudo only elevates the `echo` command — the redirect is handled before sudo takes effect. Also, file might have immutable flag set.",
    "fix": [
      "Use tee instead: `echo \"config\" | sudo tee /etc/myapp.conf`",
      "Or use sudo sh: `sudo sh -c 'echo \"config\" > /etc/myapp.conf'`",
      "Check for immutable flag: `lsattr /etc/myapp.conf` — if it shows `i`, run `sudo chattr -i /etc/myapp.conf`",
      "Check SELinux context if on RHEL/CentOS: `ls -Z /etc/myapp.conf`"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "linux-load-average-high",
    "title": "Load average is high but CPU usage is low",
    "tags": [
      "Linux"
    ],
    "summary": "top shows load average of 20+ but CPUs are mostly idle.",
    "issue": "Server feels slow. `uptime` shows load average 25. But `top` shows CPU at only 15% usage.",
    "cause": "Load average counts both CPU-bound and I/O-waiting processes. High load + low CPU = I/O bottleneck. Processes are queuing, waiting for disk or network reads to complete.",
    "fix": [
      "Confirm it is I/O: check `wa` (iowait) column in `top` — if high, disks are the bottleneck",
      "Find what is hammering disk: `iotop -o` (shows only active I/O processes)",
      "Check disk health: `iostat -xz 1` — look at `%util` and `await` columns",
      "Check for a runaway database query or log-write loop",
      "If NFS mounted: check if NFS server is slow or unreachable"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "nginx-502-bad-gateway",
    "title": "Nginx returns 502 Bad Gateway",
    "tags": [
      "Nginx"
    ],
    "summary": "Nginx is running but proxying to your app returns 502.",
    "issue": "`curl localhost` returns 502 Bad Gateway.",
    "cause": "Nginx cannot reach the upstream app. Either the app is down, listening on wrong port, or proxy_pass address is wrong.",
    "fix": [
      "Check if your app is running: `systemctl status myapp` or `docker ps`",
      "Verify app is listening: `ss -tlnp | grep 3000`",
      "Test upstream directly: `curl http://localhost:3000`",
      "Read nginx error log: `sudo tail -f /var/log/nginx/error.log`",
      "If using Docker: ensure the app container and nginx can reach each other (same network or use host IP)"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "nginx-ssl-cert-not-found",
    "title": "Nginx fails to start: SSL cert file not found",
    "tags": [
      "Nginx",
      "SSL"
    ],
    "summary": "nginx -t fails because cert paths in config do not exist yet.",
    "issue": "`sudo nginx -t` gives: `cannot load certificate .../fullchain.pem: No such file or directory`",
    "cause": "Your nginx.conf references Let's Encrypt cert paths but certbot has not run yet.",
    "fix": [
      "First use a plain HTTP nginx config with no SSL blocks",
      "Run certbot: `sudo certbot --nginx -d yourdomain.com`",
      "Certbot will update your nginx config automatically with correct cert paths",
      "Reload: `sudo systemctl reload nginx`"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "nginx-413-request-entity-too-large",
    "title": "413 Request Entity Too Large on file upload",
    "tags": [
      "Nginx"
    ],
    "summary": "File uploads fail with 413 error.",
    "issue": "Users trying to upload files get 413 Request Entity Too Large.",
    "cause": "Nginx has a default `client_max_body_size` of 1MB. Any upload larger than this is rejected before it reaches your app.",
    "fix": [
      "Increase the limit in nginx.conf inside the `server` or `location` block: `client_max_body_size 50M;`",
      "Reload nginx: `sudo systemctl reload nginx`",
      "Also check if your app framework has its own body size limit (Express: `express.json({ limit: \"50mb\" })`)"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "nginx-redirect-loop",
    "title": "ERR_TOO_MANY_REDIRECTS — redirect loop",
    "tags": [
      "Nginx"
    ],
    "summary": "Browser shows too many redirects when hitting the site.",
    "issue": "Opening the site gives \"ERR_TOO_MANY_REDIRECTS\" in the browser.",
    "cause": "Usually happens when nginx redirects HTTP to HTTPS but the upstream app also redirects, or when the proxy_pass and server_name create a loop.",
    "fix": [
      "Check your server blocks for conflicting redirect rules",
      "If using `return 301 https://...` in the HTTP block, make sure the HTTPS block does NOT also redirect",
      "Pass the scheme to the upstream app: `proxy_set_header X-Forwarded-Proto $scheme;`",
      "If your app redirects based on protocol header, trust the nginx forwarded header, not the raw connection",
      "Test with `curl -I http://yourdomain.com` and follow each hop to find where the loop starts"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "nginx-config-test-fails",
    "title": "nginx -t fails with cryptic emerg error",
    "tags": [
      "Nginx"
    ],
    "summary": "nginx config test throws emerg error and nginx will not reload.",
    "issue": "`sudo nginx -t` shows: `nginx: [emerg] unknown directive \"server_namee\"` or similar.",
    "cause": "Syntax error in the config file — typo in a directive name, missing semicolon, unclosed bracket, or a corrupt file from copy-paste.",
    "fix": [
      "Read the exact error — it includes file path and line number",
      "Open the file: `sudo nano /etc/nginx/sites-available/mysite`",
      "Common errors: missing `;` at end of line, unclosed `{`, typo in directive name",
      "Validate with: `sudo nginx -t 2>&1` — piping stderr helps see full output",
      "Start from a minimal working config and add blocks one at a time to find the bad section"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "nginx-connection-refused-on-443",
    "title": "Connection refused on port 443 (HTTPS)",
    "tags": [
      "Nginx",
      "SSL"
    ],
    "summary": "HTTP works but HTTPS gives connection refused.",
    "issue": "`curl https://yourdomain.com` gives: `curl: (7) Failed to connect to yourdomain.com port 443`",
    "cause": "Nginx is not listening on port 443. Either the SSL server block is missing, nginx is not reloaded after adding it, or firewall blocks 443.",
    "fix": [
      "Check what ports nginx listens on: `sudo ss -tlnp | grep nginx`",
      "Verify your nginx config has a `listen 443 ssl;` block",
      "Reload nginx after config changes: `sudo systemctl reload nginx`",
      "Open port in firewall: `sudo ufw allow 443` or the equivalent for your cloud security group",
      "Check certbot ran successfully and cert files exist at the referenced paths"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "nginx-upstream-timed-out",
    "title": "Nginx 504 Gateway Timeout",
    "tags": [
      "Nginx"
    ],
    "summary": "Slow requests result in 504 from nginx before the app responds.",
    "issue": "Some requests return 504 Gateway Timeout after 60 seconds.",
    "cause": "The upstream app is taking longer than nginx's `proxy_read_timeout` (default 60s) to respond.",
    "fix": [
      "Increase timeout in nginx config: `proxy_read_timeout 120s;` inside the location block",
      "Also set: `proxy_connect_timeout 60s;` and `proxy_send_timeout 60s;`",
      "Reload nginx: `sudo systemctl reload nginx`",
      "Investigate why the app is slow — the timeout is a workaround, not a fix",
      "Add request tracing to find slow database queries or external API calls"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "nginx-static-files-404",
    "title": "Static files return 404 through nginx",
    "tags": [
      "Nginx"
    ],
    "summary": "CSS, JS, or image files return 404 when served via nginx.",
    "issue": "HTML loads but all linked CSS and JS return 404.",
    "cause": "The `root` or `alias` path in the nginx config points to the wrong directory, or the location block for static files is missing.",
    "fix": [
      "Check the `root` directive in your nginx server block — it must point to the directory containing static files",
      "If serving from `/public`: `root /var/www/myapp/public;`",
      "Add explicit location for static extensions if needed: `location ~* \\.(css|js|png)$ { root /var/www/myapp/public; }`",
      "Verify file actually exists on disk at the expected path",
      "Check nginx access log to see exact path being requested: `sudo tail -f /var/log/nginx/access.log`"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "cicd-pipeline-passes-prod-broken",
    "title": "Pipeline passes but production is broken",
    "tags": [
      "CI/CD"
    ],
    "summary": "All CI tests go green but the deployed app crashes in production.",
    "issue": "CI pipeline passes every check. Deployment goes through. Production serves 500 errors.",
    "cause": "Tests pass against mocked dependencies. Real production has different env vars, live database schema, secrets that differ from test values, or the deploy target has different OS/package versions.",
    "fix": [
      "Run integration tests against a real database, not mocks",
      "Add a smoke test stage after deployment — curl a health endpoint: `curl -f https://yourapp.com/health`",
      "Use the same base Docker image in CI and production",
      "Check if a missing env var in production is causing the crash",
      "Add a rollback step: if smoke test fails, automatically redeploy previous version"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "cicd-slow-builds",
    "title": "CI builds are very slow — taking 15-20 minutes",
    "tags": [
      "CI/CD"
    ],
    "summary": "Pipeline takes too long, blocking developer feedback.",
    "issue": "Every PR triggers a 20-minute CI run. Team is slowing down.",
    "cause": "Deps installed fresh every run, no Docker layer cache, tests not parallelised, or building when only docs changed.",
    "fix": [
      "Cache dependencies: most CI systems support caching node_modules or pip based on lock file hash",
      "Use Docker build cache or a layer cache (e.g. GitHub Actions cache for Docker layers)",
      "Parallelise test suites across multiple workers",
      "Add path filters: skip CI for changes to docs/, README, or non-code files",
      "Profile what is slow: add `time` before expensive steps to find the bottleneck"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "cicd-secret-exposed-in-logs",
    "title": "Secret accidentally printed in CI logs",
    "tags": [
      "CI/CD"
    ],
    "summary": "A token or password appears in plain text in the pipeline output.",
    "issue": "Running a build command printed `DB_PASSWORD=mysecret` in the CI log that is visible to all team members.",
    "cause": "The command echoed env vars (e.g. `set -x` in shell scripts, verbose build tools), or the secret was passed as a CLI argument rather than an env var.",
    "fix": [
      "Rotate the exposed secret immediately — treat it as compromised",
      "Remove `set -x` from shell scripts that run in CI",
      "Pass secrets as environment variables, never as CLI arguments",
      "Use your CI system's secret masking — most platforms auto-mask registered secrets in logs",
      "Audit your scripts: `grep -r \"echo.*SECRET\" .` to find accidental prints"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "cicd-deploy-overwrites-running-traffic",
    "title": "Deployment causes downtime — requests drop during rollout",
    "tags": [
      "CI/CD"
    ],
    "summary": "Every deployment causes a brief outage as the old container is replaced.",
    "issue": "Users see errors or connection resets for 10-20 seconds during every deployment.",
    "cause": "Old container is stopped before the new one is ready. No graceful handoff of traffic.",
    "fix": [
      "Use rolling deployments — start new instance before killing old one",
      "On Kubernetes: configure `RollingUpdate` strategy with `maxUnavailable: 0`",
      "With Docker on a single host: use a blue-green approach — run both containers, switch nginx upstream, then stop old one",
      "Add health check to new container and wait for it to pass before routing traffic",
      "Configure nginx upstream with keepalive and `proxy_next_upstream error timeout`"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "cicd-environment-variable-not-set",
    "title": "Pipeline fails: environment variable not set",
    "tags": [
      "CI/CD"
    ],
    "summary": "Build script errors because a required env var is undefined in CI.",
    "issue": "`CI: Required env var STRIPE_KEY not set` — build fails but works locally.",
    "cause": "The variable is in your local `.env` file (not committed) but not added to the CI platform secrets.",
    "fix": [
      "Add the secret to your CI platform: GitHub Actions Secrets, GitLab CI Variables, or Jenkins Credentials",
      "Reference it in the pipeline YAML: `env: STRIPE_KEY: ${{ secrets.STRIPE_KEY }}`",
      "Add a validation step at the top of your pipeline: fail fast if required vars are missing",
      "Never commit .env files — use .env.example to document required variables"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "cicd-merge-conflict-blocks-pipeline",
    "title": "Stale branch causes pipeline failures not related to your change",
    "tags": [
      "CI/CD"
    ],
    "summary": "Your PR fails tests that your change did not touch.",
    "issue": "Your PR adds a login feature. CI fails a payment test. Your code did not touch payments.",
    "cause": "Your branch is behind main. Someone else's merged change broke the payment tests. Now your CI picks up their broken code too.",
    "fix": [
      "Rebase or merge main into your branch before pushing",
      "Enable branch protection: require branches to be up to date before merging",
      "Set up CI to always run against the merge result, not just your branch tip",
      "Communicate with the team about failing tests on main — fix main first"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "cicd-docker-push-auth-failed",
    "title": "docker push fails with authentication required in CI",
    "tags": [
      "CI/CD",
      "Docker"
    ],
    "summary": "Pipeline cannot push image to registry — auth error.",
    "issue": "CI step `docker push myregistry/myapp:v1` fails: `unauthorized: authentication required`",
    "cause": "The CI runner is not logged into the registry. Credentials either not set or incorrectly referenced.",
    "fix": [
      "Add a login step before push: `docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY`",
      "Store credentials as CI secrets, not hardcoded in the YAML",
      "For ECR (AWS): use `aws ecr get-login-password | docker login --username AWS --password-stdin <registry>`",
      "For GCR: use `gcloud auth configure-docker` or a service account key",
      "Verify the secret names match what your YAML references exactly (case-sensitive)"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "cicd-rollback-no-previous-version",
    "title": "Need to rollback but no previous version available",
    "tags": [
      "CI/CD"
    ],
    "summary": "Production is broken but you cannot rollback because old image was overwritten.",
    "issue": "Production deploy broke. You try to rollback but the previous image was tagged `latest` and is gone.",
    "cause": "Using mutable tags like `latest` means every push overwrites the previous image. You cannot go back.",
    "fix": [
      "Always tag images with immutable identifiers: git commit SHA (`myapp:abc1234`) or semver (`myapp:1.4.2`)",
      "Keep at least the last 5 image versions in your registry",
      "Store the deployed image tag in your CD pipeline output or deployment record",
      "Rollback command: `kubectl set image deployment/myapp myapp=myapp:abc1233` (previous SHA)",
      "Automate rollback: if smoke test fails post-deploy, re-deploy the previous tag automatically"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "aws-ec2-cannot-connect-ssh",
    "title": "Cannot SSH into EC2 instance",
    "tags": [
      "AWS"
    ],
    "summary": "SSH connection to EC2 times out or is refused.",
    "issue": "`ssh -i mykey.pem ec2-user@<ip>` hangs or gives connection refused.",
    "cause": "Security group does not allow port 22, wrong key pair, wrong username, or instance is in a private subnet with no route to internet.",
    "fix": [
      "Check Security Group inbound rules — port 22 must allow your IP or 0.0.0.0/0",
      "Verify correct username for the AMI: `ec2-user` (Amazon Linux), `ubuntu` (Ubuntu), `admin` (Debian)",
      "Check key pair: must use the .pem file used when the instance was launched",
      "Verify instance has a public IP (or use a bastion host if in private subnet)",
      "Check instance status in Console — it must be in \"running\" state and pass status checks"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "aws-s3-403-access-denied",
    "title": "S3 returns 403 Access Denied",
    "tags": [
      "AWS"
    ],
    "summary": "Reading or writing to S3 fails with 403 even though permissions look right.",
    "issue": "`aws s3 cp file.txt s3://mybucket/` returns: `upload failed: An error occurred (AccessDenied)`",
    "cause": "IAM policy does not grant the required s3:PutObject permission, bucket policy explicitly denies, or \"Block Public Access\" settings are blocking the operation.",
    "fix": [
      "Check IAM policy attached to your user/role includes `s3:GetObject` / `s3:PutObject` for the bucket ARN",
      "Check bucket policy for explicit Deny statements — they override IAM allows",
      "If accessing publicly: check \"Block Public Access\" settings in S3 console",
      "Test with AWS Policy Simulator: IAM console > Policy Simulator — test your actions",
      "Check the bucket region matches your CLI config: `aws s3 ls s3://mybucket --region eu-west-1`"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "aws-rds-connection-timeout",
    "title": "Application cannot connect to RDS",
    "tags": [
      "AWS"
    ],
    "summary": "App gets connection timeout when connecting to RDS database.",
    "issue": "App throws: `could not connect to server: Connection timed out — Is the server running on host \"mydb.xxx.rds.amazonaws.com\"`",
    "cause": "RDS security group does not allow inbound traffic from the app server, or RDS is in a private subnet the app cannot reach.",
    "fix": [
      "Check RDS security group — it must allow inbound on port 5432 (Postgres) or 3306 (MySQL) from the app's security group or IP",
      "Ensure both app and RDS are in the same VPC, or VPC peering is configured",
      "RDS should be in private subnets — app accesses it via VPC, not public internet",
      "Test connectivity from app server: `nc -zv mydb.xxx.rds.amazonaws.com 5432`",
      "Check RDS instance is in \"Available\" state in the console"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "aws-lambda-timeout",
    "title": "Lambda function times out",
    "tags": [
      "AWS"
    ],
    "summary": "Lambda hits timeout limit and never completes the task.",
    "issue": "Lambda function returns: `Task timed out after 3.00 seconds`",
    "cause": "Default Lambda timeout is 3 seconds. If your function does DB queries, calls external APIs, or processes large files, it exceeds this limit.",
    "fix": [
      "Increase timeout in Lambda console (Configuration > General configuration) — max is 15 minutes",
      "Profile what is slow inside the function — add timestamps around each operation",
      "Move heavy processing to a background job (SQS + Lambda consumer) instead of synchronous",
      "For very long tasks: use Step Functions or ECS Fargate instead of Lambda",
      "Set timeout to expected duration + 20% buffer, not the maximum"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "aws-iam-assume-role-failed",
    "title": "AWS assume role fails with AccessDenied",
    "tags": [
      "AWS"
    ],
    "summary": "Cross-account or service assume-role call is denied.",
    "issue": "`aws sts assume-role --role-arn arn:aws:iam::123:role/MyRole` returns AccessDenied.",
    "cause": "The IAM entity calling AssumeRole is not listed in the role's trust policy, or the entity's permission policy does not include `sts:AssumeRole`.",
    "fix": [
      "Check the target role's Trust Policy — the calling account/user/service must be in `Principal`",
      "Check the caller's IAM policy includes `sts:AssumeRole` for the target role ARN",
      "If cross-account: both the trust policy (in target account) and the permission policy (in source account) must be set",
      "Verify you are using the correct role ARN (exact match, no typos)",
      "Use CloudTrail to see the exact denied API call and which policy blocked it"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "aws-alb-504-timeout",
    "title": "ALB returns 504 Gateway Timeout",
    "tags": [
      "AWS"
    ],
    "summary": "Application Load Balancer returns 504 for slow requests.",
    "issue": "Some requests hitting the ALB return 504 after 60 seconds.",
    "cause": "ALB idle timeout (default 60s) is shorter than your app's response time. ALB closes the connection before the backend finishes.",
    "fix": [
      "Increase ALB idle timeout: EC2 console > Load Balancers > your ALB > Attributes > Idle timeout",
      "Set it slightly above your slowest expected response time",
      "Also check if your target group health check is failing — unhealthy targets get 502/504",
      "Profile your app to reduce response time for slow endpoints",
      "For very long operations: return 202 Accepted immediately and process asynchronously"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "aws-cloudwatch-logs-not-appearing",
    "title": "Logs not appearing in CloudWatch",
    "tags": [
      "AWS"
    ],
    "summary": "Application logs not showing up in CloudWatch Log Groups.",
    "issue": "Your app is running on EC2/ECS but no logs appear in CloudWatch.",
    "cause": "CloudWatch agent not installed or configured, IAM role missing `logs:PutLogEvents` permission, or wrong log group name.",
    "fix": [
      "For EC2: install and configure the CloudWatch agent — `sudo yum install amazon-cloudwatch-agent`",
      "For ECS: add `awslogs` log driver in task definition",
      "Check IAM role has: `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`",
      "Verify the log group exists in the same region as your service",
      "Check agent status: `sudo systemctl status amazon-cloudwatch-agent`"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "aws-ec2-high-cost-unexpected",
    "title": "Unexpected high AWS bill from EC2",
    "tags": [
      "AWS"
    ],
    "summary": "AWS bill is much higher than expected due to EC2 usage.",
    "issue": "Monthly bill shows EC2 charges 5x higher than budgeted.",
    "cause": "Forgotten running instances (especially in non-default regions), data transfer charges, using On-Demand when Reserved would be cheaper, or NAT Gateway data charges.",
    "fix": [
      "Enable AWS Cost Explorer and look at usage by service and region",
      "Check ALL regions for running instances — use AWS Config or Trusted Advisor",
      "Set up billing alerts: Budgets console > create budget with alert at 80% of expected",
      "Stop/terminate instances not in use — stopped instances still pay for EBS storage",
      "Data transfer: traffic out of AWS costs money — check NAT Gateway charges separately",
      "For predictable workloads: switch to Reserved Instances or Savings Plans (up to 72% cheaper)"
    ],
    "date": "2026-06-08"
  },
  {
    "slug": "git-accidentally-committed-secret",
    "title": "Secret accidentally committed to Git",
    "tags": [
      "Git"
    ],
    "summary": "API key or password committed to the repo — need to remove it from history.",
    "issue": "You committed and pushed a file containing `AWS_SECRET=AKIAIOSFODNN7...` to GitHub.",
    "cause": ".env or config file was not in .gitignore and was accidentally staged and committed.",
    "fix": [
      "FIRST: rotate the secret immediately — assume it is compromised",
      "Remove from history: `git filter-repo --path .env --invert-paths` (install git-filter-repo)",
      "Force push the cleaned history: `git push --force --all`",
      "Add to .gitignore: `.env`, `*.pem`, `credentials.json`",
      "Use pre-commit hooks or tools like `gitleaks` to scan for secrets before every commit",
      "If pushed to a public repo: GitHub will likely alert you via their secret scanning feature"
    ],
    "date": "2026-06-01"
  },
  {
    "slug": "git-detached-head",
    "title": "Stuck in detached HEAD state",
    "tags": [
      "Git"
    ],
    "summary": "git status shows \"HEAD detached\" and commits seem to disappear.",
    "issue": "`git status` shows \"HEAD detached at abc1234\". Commits you make seem to vanish.",
    "cause": "You checked out a specific commit hash or tag instead of a branch. Git is now not on any branch — commits are made but not reachable via any branch name.",
    "fix": [
      "To go back to a branch: `git checkout main` (or master/your branch name)",
      "To save your work: create a branch from the detached state: `git checkout -b my-work`",
      "To see what HEAD is: `git log --oneline -5`",
      "Commits in detached HEAD are not lost immediately — git gc will clean them up after 30 days"
    ],
    "date": "2026-06-02"
  },
  {
    "slug": "git-merge-conflict-resolution",
    "title": "Merge conflict blocks PR merge",
    "tags": [
      "Git"
    ],
    "summary": "PR cannot be merged due to conflicts with the target branch.",
    "issue": "GitHub shows \"This branch has conflicts that must be resolved\" and the merge button is disabled.",
    "cause": "Same lines were changed in both the source branch and the target branch (e.g. main).",
    "fix": [
      "Pull the latest target branch: `git fetch origin && git checkout main && git pull`",
      "Merge target into your branch: `git checkout my-feature && git merge main`",
      "Open conflicting files — look for `<<<<<<`, `=======`, `>>>>>>>` markers",
      "Edit the file to keep the correct code, remove the conflict markers",
      "Stage resolved files: `git add <file>` then `git commit`",
      "Push and the PR conflict should clear"
    ],
    "date": "2026-06-03"
  },
  {
    "slug": "git-revert-pushed-commit",
    "title": "Need to undo a commit already pushed to main",
    "tags": [
      "Git"
    ],
    "summary": "Bad commit was merged to main — need to remove it without rewriting history.",
    "issue": "A bad change was pushed to main. Force-push is not allowed. Need to undo it safely.",
    "cause": "The commit introduced a bug or broke production.",
    "fix": [
      "Use `git revert` — it creates a new commit that undoes the change, safe for shared branches",
      "`git revert <commit-sha>` — creates the inverse commit",
      "Push normally: `git push origin main`",
      "If the commit is a merge commit: `git revert -m 1 <merge-commit-sha>`",
      "Do NOT use `git reset --hard` on shared branches — it rewrites history and breaks other developers"
    ],
    "date": "2026-06-04"
  },
  {
    "slug": "git-large-file-push-rejected",
    "title": "Push rejected: file too large",
    "tags": [
      "Git"
    ],
    "summary": "git push fails because a large file was committed.",
    "issue": "`git push` fails: `remote: error: File data/model.bin is 210.00 MB; exceeds GitHub maximum file size of 100.00 MB`",
    "cause": "A large binary or data file was committed to the repo. GitHub/GitLab reject files over 100MB.",
    "fix": [
      "Remove the file from the last commit without losing your other changes: `git rm --cached data/model.bin && git commit --amend`",
      "If the file is in multiple commits: use `git filter-repo --path data/model.bin --invert-paths`",
      "Add the file type to .gitignore to prevent future accidents",
      "For large files you need to version: use Git LFS (`git lfs track \"*.bin\"`)",
      "For datasets and models: use cloud storage (S3) and reference by URL instead of committing"
    ],
    "date": "2026-06-05"
  },
  {
    "slug": "git-wrong-branch-commit",
    "title": "Committed to main instead of feature branch",
    "tags": [
      "Git"
    ],
    "summary": "Accidentally committed directly to main (or wrong branch).",
    "issue": "You ran `git commit` and `git push` but forgot to switch to your feature branch first.",
    "cause": "Committed while on main. If not yet pushed, easy to fix. If pushed to a protected branch, need git revert.",
    "fix": [
      "If NOT yet pushed: `git reset HEAD~1` to undo the commit while keeping changes, then switch branches and recommit",
      "If pushed to main: use `git revert <sha>` to create an undo commit and push it",
      "Move the changes to the right branch: `git stash` after reset, then `git checkout feature-branch && git stash pop`",
      "Prevent future accidents: enable branch protection rules on main to require PRs"
    ],
    "date": "2026-06-06"
  },
  {
    "slug": "git-history-diverged",
    "title": "Branches have diverged — push rejected",
    "tags": [
      "Git"
    ],
    "summary": "git push rejected because remote has commits your local branch does not.",
    "issue": "`git push` fails: `rejected — non-fast-forward: Updates were rejected because the remote contains work that you do not have locally`",
    "cause": "Someone else pushed to the same branch, or you pushed from another machine. Your local branch is behind the remote.",
    "fix": [
      "Pull first: `git pull --rebase origin main` (rebase keeps history linear)",
      "Or: `git pull origin main` (creates a merge commit)",
      "Resolve any conflicts that arise, then push again",
      "Do NOT use `git push --force` unless you are the only one on that branch — it overwrites others' work",
      "Use `--force-with-lease` if you must force push: safer, fails if someone else pushed"
    ],
    "date": "2026-06-07"
  },
  {
    "slug": "git-submodule-not-cloned",
    "title": "Submodule directory is empty after git clone",
    "tags": [
      "Git"
    ],
    "summary": "After cloning a repo, submodule folders are empty.",
    "issue": "You cloned a repo. A folder like `vendor/somelib` exists but is empty. Code fails to build.",
    "cause": "Git submodules are not automatically cloned. You need an extra step to fetch their content.",
    "fix": [
      "Initialize and fetch submodules: `git submodule update --init --recursive`",
      "Or clone with submodules from the start: `git clone --recurse-submodules <url>`",
      "To update submodules to their latest commit: `git submodule update --remote`",
      "Check registered submodules: `cat .gitmodules`"
    ],
    "date": "2026-06-08"
  }
];
