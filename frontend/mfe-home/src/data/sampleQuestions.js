// Ported verbatim from the legacy home.hbs sample-question carousel.
export const sampleQuestions = [
  {
    topic: "Linux", color: "#E8A838", level: "Mid Level", type: "Scenario Question",
    q: "Your cron job has been running fine for three weeks. Today it did not run. There are no errors in the cron log. The server looks perfectly healthy — CPU normal, memory fine, disk not full. Your manager is asking why the job failed. Walk me through exactly how you debug this.",
    blur: "Start by verifying cron is actually running: systemctl status cron. Then check the full cron log at /var/log/syslog or journalctl -u cron. A common trap: cron runs with a minimal PATH — your .bashrc is not sourced. Reproduce with env -i /bin/sh -c your-script.sh. Also check /var/mail/root — cron emails failed output there by default...",
    cta: "Read Full Answer + 61 More Linux Questions →",
    link: "/interview-prep/linux",
  },
  {
    topic: "Docker", color: "#2496ED", level: "Senior Level", type: "Scenario Question",
    q: "Your container keeps restarting every 30 seconds. docker ps shows status as Restarting. The application was working yesterday and nothing in the image changed. What is your debugging process?",
    blur: 'Run docker logs <container> to see the last crash output. Check the exit code with docker inspect <container> --format="{{.State.ExitCode}}". Exit code 137 means OOMKilled — the container hit its memory limit. Exit code 1 is an app crash. Check if a required env variable or mounted secret is missing. Run the container interactively with docker run -it --entrypoint sh to debug inside...',
    cta: "Read Full Answer + More Docker Questions →",
    link: "/interview-prep/docker",
  },
  {
    topic: "Kubernetes", color: "#326CE5", level: "Senior Level", type: "Scenario Question",
    q: "A pod is stuck in CrashLoopBackOff. The app team says the code is fine and it works locally in Docker. Kubernetes is new to this team. Walk through your full diagnosis.",
    blur: "Start with kubectl describe pod <pod> — look at Events at the bottom. Then kubectl logs <pod> --previous to see the last crash. Common causes: missing ConfigMap or Secret the pod depends on, wrong image tag, liveness probe failing too early, or resource limits set too low. Check if the container even starts: kubectl exec -it <pod> -- sh...",
    cta: "Read Full Answer + More Kubernetes Questions →",
    link: "/interview-prep/kubernetes",
  },
  {
    topic: "Nginx", color: "#009900", level: "Mid Level", type: "Scenario Question",
    q: "Users are hitting a 502 Bad Gateway. Nginx is running. The upstream app server is running. Nothing was deployed today. The error started 20 minutes ago. What do you check?",
    blur: 'Check /var/log/nginx/error.log — 502 usually says "connect() failed" or "upstream timed out". Verify the upstream is actually accepting connections: curl http://127.0.0.1:3000/health. Check if the app ran out of worker processes or file descriptors. Look at ulimit -n and ss -tlnp. If the upstream is a socket file, check if it was recreated with wrong permissions after a restart...',
    cta: "Read Full Answer + More Production Fixes →",
    link: "/fixes",
  },
  {
    topic: "AWS", color: "#FF9900", level: "Senior Level", type: "Scenario Question",
    q: "Your EC2 instance is running but you cannot SSH into it. The instance was working fine this morning. No one made changes to the security group. What is your step-by-step diagnosis?",
    blur: "Check the instance status checks in the EC2 console — a failed system status check means the underlying host has an issue, use Stop/Start (not Reboot) to migrate it. Check the security group allows port 22 from your IP. Check the NACL for the subnet. Try EC2 Instance Connect or Session Manager if SSH is blocked. Check /var/log/auth.log via the EC2 serial console. Disk full on the root volume will also prevent SSH...",
    cta: "Read Full Answer + More AWS Questions →",
    link: "/interview-prep/aws",
  },
  {
    topic: "Git", color: "#F05032", level: "Mid Level", type: "Scenario Question",
    q: "A developer pushed directly to main and broke the build. You need to undo their commit without losing anyone else's work that was pushed after. What is the safest approach?",
    blur: "Never use git reset --hard on a shared branch — it rewrites history and breaks everyone else. Use git revert <commit-sha> instead — it creates a new commit that undoes the changes. If multiple commits need reverting, revert them in reverse order. Then push normally. If the bad commit introduced a secret, you also need to rotate that credential immediately — revert does not erase git history...",
    cta: "Read Full Answer + More Git Questions →",
    link: "/interview-prep/git",
  },
];
