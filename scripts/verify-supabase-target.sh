#!/usr/bin/env bash
set -euo pipefail

project_ref="${SUPABASE_PROJECT_REF:-}"
access_token="${SUPABASE_ACCESS_TOKEN:-}"
db_password="${SUPABASE_DB_PASSWORD:-}"

koribetween_dev_ref="ublirowfqjgzxfrdtlsf"
koribetween_prod_ref="qocpkjrmvfxjchrldgfk"

if [[ -z "${access_token}" ]]; then
  echo "SUPABASE_ACCESS_TOKEN secret is missing."
  exit 1
fi

if [[ -z "${db_password}" ]]; then
  echo "SUPABASE_DB_PASSWORD_DEV secret is missing."
  exit 1
fi

if [[ -z "${project_ref}" ]]; then
  echo "SUPABASE_PROJECT_REF_DEV variable is missing."
  exit 1
fi

if [[ ! "${project_ref}" =~ ^[a-z]{20}$ ]]; then
  echo "SUPABASE_PROJECT_REF_DEV does not look like a Supabase project ref."
  exit 1
fi

if [[ "${project_ref}" == "${koribetween_dev_ref}" || "${project_ref}" == "${koribetween_prod_ref}" ]]; then
  echo "Refusing to deploy: target project ref belongs to KoriBetween."
  exit 1
fi

echo "Supabase target ref passed safety checks."
