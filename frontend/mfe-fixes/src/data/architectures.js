export const architectures = [
  {
    "slug": "netflix-architecture",
    "title": "Netflix System Architecture",
    "icon": "NETFLIX",
    "tag": "MICROSERVICES",
    "difficulty": "Advanced",
    "thumbnail": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    "desc": "How Netflix serves 270M users across 190 countries. Microservices, Chaos Engineering, multi-region active-active, and the Zuul API gateway that handles 2M requests per second.",
    "components": [
      "Route53",
      "Zuul API Gateway",
      "Eureka (Service Discovery)",
      "Hystrix (Circuit Breaker)",
      "Apache Kafka",
      "Cassandra",
      "EVCache (Memcached)",
      "Chaos Monkey"
    ]
  },
  {
    "slug": "spotify-architecture",
    "title": "Spotify Engineering Architecture",
    "icon": "SPOTIFY",
    "tag": "PLATFORM",
    "difficulty": "Advanced",
    "thumbnail": "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=600&q=80",
    "desc": "How Spotify scaled to 600M users with the Squad model, Backstage developer portal, GCP-native infrastructure, and the Confidence CI/CD platform that deploys 250 times a day.",
    "components": [
      "GCP GKE",
      "Backstage (Dev Portal)",
      "Confidence (CI/CD)",
      "Apache Beam (Data)",
      "BigQuery",
      "Pub/Sub",
      "Flink",
      "Backend for Frontend (BFF)"
    ]
  },
  {
    "slug": "4-tier-production-aws",
    "title": "4-Tier Production App: DNS to Database",
    "icon": "AWS",
    "tag": "AWS",
    "difficulty": "Intermediate",
    "thumbnail": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    "desc": "Complete end-to-end production architecture: DNS resolution to database writes. Route53 to CloudFront to WAF to ALB to EKS to PostgreSQL. The blueprint most funded startups run in production.",
    "components": [
      "Route53 (DNS)",
      "CloudFront (CDN)",
      "AWS WAF",
      "ALB (Load Balancer)",
      "EKS (App Tier)",
      "RDS PostgreSQL",
      "ElastiCache Redis",
      "S3 + SQS"
    ]
  },
  {
    "slug": "4-tier-service-mesh",
    "title": "4-Tier with Service Mesh and Observability",
    "icon": "K8S",
    "tag": "KUBERNETES",
    "difficulty": "Advanced",
    "thumbnail": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    "desc": "Production-grade 4-tier setup with a service mesh layer: DNS to Ingress to Istio to microservices. Full observability with Prometheus, Grafana, Jaeger tracing, and OpenTelemetry from day one.",
    "components": [
      "Route53 (DNS)",
      "Traefik / NGINX Ingress",
      "Istio Service Mesh (mTLS)",
      "Kubernetes Microservices",
      "Prometheus + Grafana",
      "Jaeger (Tracing)",
      "OpenTelemetry Collector",
      "ELK Stack"
    ]
  },
  {
    "slug": "serverless-aws",
    "title": "Serverless Architecture on AWS",
    "icon": "AWS",
    "tag": "AWS",
    "difficulty": "Beginner",
    "thumbnail": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
    "desc": "Event-driven app with Lambda, API Gateway, and DynamoDB. Zero server management, infinite scale on demand.",
    "components": [
      "API Gateway",
      "Lambda",
      "DynamoDB",
      "S3",
      "SQS",
      "SNS",
      "CloudWatch"
    ]
  },
  {
    "slug": "multi-region-dr",
    "title": "Multi-Region Disaster Recovery",
    "icon": "DR",
    "tag": "AWS",
    "difficulty": "Advanced",
    "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    "desc": "Active-passive DR across two AWS regions with RTO under 30 minutes. The question that separates senior engineers.",
    "components": [
      "Route53 Failover",
      "RDS Cross-Region Replica",
      "S3 Replication",
      "AMI Copy",
      "CloudFormation StackSets"
    ]
  }
];
