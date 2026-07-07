FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src/ src/

RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine AS runtime


WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/target/*.jar app.jar

RUN chown appuser:appgroup app.jar


USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ARG GIT_SHA=unknown
LABEL org.opencontainers.image.revision=$GIT_SHA

ENTRYPOINT [ "java", "-jar", "app.jar" ]