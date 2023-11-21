---
title: "Tekton Task Trivy-SBOM"
date: 2023-11-16
draft: false
description: "Generating SBOM reports using Trivy"
weight: 7
---

## Trivy Scanner with SBOM Generation and ClickHouse Storage

This Tekton task integrates Trivy for vulnerability scanning, generates a Software Bill of Materials (SBOM) in SPDX format, and stores the SBOM in ClickHouse database.

### Parameters

- **TRIVY_IMAGE**: Trivy scanner image to be used.
  - Default: docker.io/aquasec/trivy:0.44.0
- **IMAGE**: Image or Path to be scanned by Trivy.
  - Default: alpine
- **DIGEST**: SHA256 Digest of the image.
  - Default: "sha256:567898ytrfkj9876trtyujko9876tghjioiuyhgfb"
- **format**: Format for the generated SBOM (e.g., spdx-json).
  - Default: spdx-json

### Workspaces

- **manifest-dir**
- **clickhouse**
- **python-clickhouse**

### Results

- **IMAGE_SBOM**: SBOM of the image just built.

### Steps

#### trivy-sboms

This step runs Trivy to scan the provided image, generates an SBOM in SPDX format, and saves it to `sbom.json`.

```bash
#!/usr/bin/env sh
cmd="trivy image --format $(params.format) --output spdx.json --input target/images/docker-image-local.tar"
echo "Running trivy task with command below"
echo "$cmd"
eval "$cmd"
echo "result of above command $?"
trivy sbom ./spdx.json > sbom.json
```

#### clickhouse-client

This step interacts with the ClickHouse database to store the generated SBOM.

```bash
#!/usr/bin/env sh
ls -al
export CLICKHOUSE_HOST=`cat /workspace/clickhouse/host`
export port=`cat /workspace/clickhouse/port`
export CLICKHOUSE_USER=`cat /workspace/clickhouse/user`
export CLICKHOUSE_PASSWORD=`cat /workspace/clickhouse/password`
cat /workspace/python-clickhouse/clickhouse.py > clickhouse.py
cat clickhouse.py
cat ${SBOM_FILE_PATH}
python clickhouse.py
```

The script retrieves necessary environment variables for ClickHouse connection, prepares the ClickHouse client script, and executes it to store the SBOM.

Please ensure the necessary ClickHouse configurations are provided in the workspaces (clickhouse and python-clickhouse) before running this task.