---
title: "Tekton Task Sonar Scan"
date: 2023-11-16
draft: false
description: "Scanning the Source Code using SonarQube"
weight: 3
---

# Tekton ClusterTask: SonarQube Scanner

## Description

The `sonarscan` ClusterTask facilitates static code analysis using SonarQube, provided a SonarQube server is hosted. SonarQube is a powerful tool for continuous inspection of code quality and security, supporting over 25 popular programming languages. It detects bugs, vulnerabilities, and code smells across project branches and pull requests.

## Parameters

- `SONAR_SCANNER_IMAGE`: The SonarQube scanner CLI image for performing the scan. Default: `docker.io/sonarsource/sonar-scanner-cli:4.6@sha256:7a976330a8bad1beca6584c1c118e946e7a25fdc5b664d5c0a869a6577d81b4f`

- `SONAR_COVERAGE_TRH`: Default threshold value of SonarQube code scan to pass. Default: `80.00`

- `SONAR-EXIT-CODE`: Exit code to determine task success or failure. Default: `0`

## Workspaces

- `source`: Workspace containing the code to be scanned by SonarQube.

- `sonar-settings` (optional): Optional workspace where SonarQube properties can be mounted.

- `sonar-token` (optional): Sonar login required to send the scan results to SonarCloud.

## Steps

### sonar-scan

This step uses the SonarQube scanner CLI image specified in `SONAR_SCANNER_IMAGE`. It performs the following operations:

```bash
#!/usr/bin/env bash
pwd
export SONAR_TOKEN=`cat /workspace/sonar-token/SONAR_TOKEN`
echo $SONAR_TOKEN
cp /workspace/sonar-settings/sonar-project.properties .
ls -al
cat sonar-project.properties
sonar-scanner
apk update && apk add curl jq
```

### Extracting Sonar Host URL and Project Key

The script extracts the Sonar host URL and project key from `sonar-project.properties`:

```bash
# Extract sonar.host.url
export line=$(grep "sonar.host.url" "sonar-project.properties")
export SONAR_HOST=$(echo "$line" | cut -d'=' -f2)
export SONAR_HOST=$(echo "$SONAR_HOST" | tr -d ' ')
echo "Sonar Host URL: $SONAR_HOST"

# Extract sonar.projectKey
export line=$(grep "sonar.projectKey" "sonar-project.properties")
export SONAR_PROJ=$(echo "$line" | cut -d'=' -f2)
export SONAR_PROJ=$(echo "$SONAR_PROJ" | tr-d ' ')
echo "Sonar Project Key: $SONAR_PROJ"
```

This code segment retrieves the Sonar host URL and project key, crucial for the subsequent steps in the SonarQube scanning process.

### Retrieving Code Coverage

The following code retrieves the code coverage percentage from the SonarQube server:

```bash
# Retrieve SONAR_COVERAGE using curl and jq
export SONAR_COVERAGE=$(curl "$SONAR_HOST/api/measures/component?metricKeys=coverage&componentKey=$SONAR_PROJ" | jq -r ".component.measures[] | .value")
if [ -n "$SONAR_COVERAGE" ]; then
    echo "Threshold code coverage is $(params.SONAR_COVERAGE_TRH)"
    echo "Actual code coverage is $SONAR_COVERAGE" 
    wait       
    comparison_result=$(echo "$(params.SONAR_COVERAGE_TRH) >= $SONAR_COVERAGE" | bc)
    if [ "$comparison_result" -eq 1 ];then
        echo "Failing sonar scan due to lack of code coverage"
        exit $(params.SONAR-EXIT-CODE)
    fi
else
  curl "$SONAR_HOST/api/measures/component?metricKeys=coverage&componentKey=$SONAR_PROJ" > sonar_scan_details
  cat sonar_scan_details
  echo "There is no code coverage value that, may be there are few issues or critical vulns found in scan"
  echo "Please check the sonar dashboard for more information"
  exit $(params.SONAR-EXIT-CODE)
fi
```

This code segment fetches the code coverage data from the SonarQube server and compares it against a specified threshold. If the code coverage falls below the threshold, the task will fail and exit with a specified exit code.

