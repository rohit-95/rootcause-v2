// Ported from the legacy roadmap.hbs — each phase is data-driven so the
// component can render any combination of sections/pipeline without per-phase markup.
// Each col has one or more {label, items, recommended?} sections, an optional
// vertical `pipeline` (arrow chain), and an optional `cta` link.
export const roadmapPhases = [
  {
    num: "Phase 1", title: "Linux Fundamentals", duration: "2 – 4 weeks", tag: "live",
    why: "This is where every DevOps engineer should start. Linux is the OS every container runs on, every cloud VM runs on, every CI runner runs on.",
    cols: [
      { sections: [{ label: "Learn", items: ["Linux installation & file system structure", "Permissions (chmod, chown)", "Users and groups", "Processes (ps, top, kill)", "Package managers (apt, yum)", "Services (systemctl)", "Networking: ping, curl, netstat, ss, dig, nslookup", "SSH, Cron jobs, Logs (journalctl, /var/log)"] }] },
      { sections: [{ label: "Practice", items: ["Create users & configure SSH", "Install Nginx", "Host a website on Linux"] }], cta: { text: "Linux Questions & Notes →", href: "/interview-prep/linux" } },
    ],
  },
  {
    num: "Phase 2", title: "Networking Fundamentals", duration: "2 weeks",
    why: "Most DevOps issues are networking issues.",
    cols: [
      { sections: [{ label: "Learn", items: ["OSI Model, TCP/IP, HTTP/HTTPS", "DNS, Ports, Firewalls, NAT", "Load Balancers & Reverse Proxy", "SSL/TLS, CIDR, Subnets"] }] },
      { sections: [{ label: "Practice", items: ["Configure DNS", "Install Nginx reverse proxy", "Generate SSL certificates", "Debug network problems"] }] },
    ],
  },
  {
    num: "Phase 3", title: "Scripting", duration: "2 – 4 weeks",
    why: "Automation is the heart of DevOps.",
    cols: [
      { sections: [
        { label: "Bash", items: ["Variables, Loops, Functions, Arrays", "Conditions, Reading files"] },
        { label: "Build", items: ["Backup script", "Log cleanup script", "Health check script"] },
      ] },
      { sections: [
        { label: "Python", recommended: true, items: ["Variables, Functions, Lists, Dictionaries", "APIs, File handling, Exception handling"] },
        { label: "Build", items: ["Server monitoring tool", "Slack notifications", "Automation scripts"] },
      ] },
    ],
  },
  {
    num: "Phase 4", title: "Git & GitHub", duration: "1 week",
    cols: [
      { sections: [{ label: "Learn", items: ["Repository, Branches, Merge, Rebase", "Pull Requests, Git Tags, Cherry-pick", "Git Hooks"] }] },
      { sections: [{ label: "Practice", items: ["Create repositories & feature branches", "Release tags & Pull Requests"] }] },
    ],
  },
  {
    num: "Phase 5", title: "Containers — Docker", duration: "2 weeks", tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Images, Containers, Dockerfile", "Volumes, Networks, Multi-stage builds", "Docker Compose, Registry"] }] },
      { sections: [{ label: "Build", items: ["Containerize a Java, Node, and Python app", "Push images to Docker Hub, ACR, ECR"] }] },
    ],
  },
  {
    num: "Phase 6", title: "CI/CD", duration: "3 – 4 weeks", tag: "soon",
    why: "This is where DevOps becomes real.",
    cols: [
      { sections: [
        { label: "Learn", items: ["Build & release pipelines", "Artifacts & secrets management", "Environment promotion, pipeline templates", "Reusable workflows"] },
        { label: "Tools", items: ["GitHub Actions", "Jenkins", "Azure DevOps"] },
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Code", "Build", "Test", "Security Scan", "Docker Build", "Push Image", "Deploy"] },
    ],
  },
  {
    num: "Phase 7", title: "Cloud Fundamentals — Azure", duration: "4 weeks", tag: "soon",
    why: "Pick one cloud first and go deep. Azure is a strong choice given its enterprise adoption and AKS maturity.",
    cols: [
      { sections: [
        { label: "Compute & Storage", items: ["Virtual Machines & Scale Sets", "Storage Accounts & Blob Storage"] },
        { label: "Networking", items: ["VNet, NSG, Load Balancer", "Application Gateway, Private Endpoints"] },
      ] },
      { sections: [
        { label: "Security", items: ["Managed Identity, Key Vault, RBAC"] },
        { label: "Containers & Monitoring", items: ["AKS, ACR", "Azure Monitor, Log Analytics, Alerts"] },
      ] },
    ],
  },
  {
    num: "Phase 8", title: "Infrastructure as Code — Terraform", duration: "3 weeks", tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Providers, Resources, Variables, Outputs", "Modules, State, Remote Backend", "Workspaces, Data Sources"] }] },
      { sections: [{ label: "Build" }], pipeline: ["VNet", "AKS", "ACR", "Key Vault", "Database"] },
    ],
  },
  {
    num: "Phase 9", title: "Kubernetes", duration: "6 – 8 weeks", tag: "soon", major: true,
    why: 'This is where many engineers stop being "Cloud Engineers" and become "Senior DevOps Engineers."',
    cols: [
      { sections: [
        { label: "Core Concepts", items: ["Pods, ReplicaSets, Deployments", "Services, ConfigMaps, Secrets", "Namespaces, Jobs, CronJobs", "Persistent Volumes"] },
        { label: "Networking", items: ["Ingress, NetworkPolicy, Service Mesh"] },
        { label: "Scaling & Security", items: ["HPA, Cluster Autoscaler", "RBAC, Service Accounts, Pod Security"] },
        { label: "Advanced", items: ["Operators, Helm, CRDs"] },
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Application", "Docker", "Kubernetes", "Ingress", "TLS", "Autoscaling"] },
    ],
  },
  {
    num: "Phase 10", title: "GitOps", duration: "2 weeks", tag: "soon",
    cols: [
      { sections: [
        { label: "Learn", items: ["Declarative deployments", "Git as source of truth", "Sync strategies, Rollbacks"] },
        { label: "Tools", items: ["ArgoCD", "Flux"] },
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Git", "ArgoCD", "Kubernetes"] },
    ],
  },
  {
    num: "Phase 11", title: "Monitoring & Observability", duration: "3 weeks", tag: "soon",
    cols: [
      { sections: [
        { label: "Learn", items: ["Metrics, Logs, Tracing, Alerting"] },
        { label: "Tools", items: ["Prometheus & Grafana", "Loki, OpenTelemetry, ELK"] },
      ] },
      { sections: [{ label: "Build a Dashboard tracking", items: ["CPU & Memory", "Request count & Error rate", "Latency"] }] },
    ],
  },
  {
    num: "Phase 12", title: "Security & DevSecOps", duration: "3 weeks", tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Secrets management", "Container & image scanning", "Dependency scanning", "IAM & Supply chain security", "Policy as Code"] }] },
      { sections: [{ label: "Tools", items: ["Trivy, Checkov, SonarQube", "Snyk, OPA, Kyverno"] }] },
    ],
  },
  {
    num: "Phase 13", title: "Real Production Architecture", duration: "Capstone", major: true,
    why: "Everything comes together into a single production-grade pipeline.",
    pipelineHorizontal: ["GitHub", "GitHub Actions", "Terraform", "Azure", "AKS", "ArgoCD", "Application", "Ingress", "Monitoring", "Alerts"],
  },
  {
    num: "Phase 14", title: "Platform Engineering", duration: "Advanced",
    cols: [
      { sections: [{ label: "Learn", items: ["Internal Developer Platforms", "Golden Paths & Self-service Infrastructure", "Developer Experience", "Backstage, Crossplane", "Kubernetes Operators"] }] },
    ],
  },
  {
    num: "Phase 15", title: "AI + DevOps", duration: "The Future", tag: "future", future: true,
    cols: [
      { sections: [{ label: "Learn", items: ["AI-assisted incident management", "AI-generated pipelines", "AIOps & LLM integrations", "MCP Servers", "AI Agents for operations"] }] },
    ],
  },
];
