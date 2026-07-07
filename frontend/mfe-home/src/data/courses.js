// Trimmed down to the fields the home page courses grid actually renders.
// Full curriculum/downloads/FAQ data lives with mfe-interview when that's built.
export const courses = [
  { slug: "linux", name: "Linux", icon: "LNX", category: "Foundation", tagline: "Shell, permissions, processes, and sysadmin fundamentals.", color: "#E8A838", available: true },
  { slug: "docker", name: "Docker", icon: "DCK", category: "Containers", tagline: "Containers, images, networking, and production patterns.", color: "#2496ED", available: false },
  { slug: "kubernetes", name: "Kubernetes", icon: "K8S", category: "Orchestration", tagline: "Pods, deployments, services, and cluster operations.", color: "#326CE5", available: false },
  { slug: "aws", name: "AWS", icon: "AWS", category: "Cloud", tagline: "EC2, S3, IAM, VPC, and core cloud services explained.", color: "#FF9900", available: false },
  { slug: "cicd", name: "CI/CD", icon: "CCD", category: "Automation", tagline: "GitHub Actions, Jenkins, pipelines, and release automation.", color: "#2ECC71", available: false },
  { slug: "monitoring", name: "Monitoring", icon: "MON", category: "Observability", tagline: "Prometheus, Grafana, alerting, and production observability.", color: "#E6522C", available: false },
  { slug: "devsecops", name: "DevSecOps", icon: "SEC", category: "Security", tagline: "Shift left security, SAST/DAST, secrets management, and compliance.", color: "#9B59B6", available: false },
  { slug: "git", name: "Git", icon: "GIT", category: "Foundation", tagline: "Branching, rebasing, GitOps, and real-world team workflows.", color: "#F05032", available: false },
];
