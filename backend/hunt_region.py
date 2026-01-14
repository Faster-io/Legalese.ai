import psycopg2
import subprocess
import re
import sys

# Params
project_ref = "xplxzmcbxpdhkcjpkopm"
password_raw = "aYKHJ6wu!03Pyg2que0P"
user_fmt = f"postgres.{project_ref}"

# Supabase Pooler Regions
regions = [
    "aws-0-us-east-1",     # N. Virginia
    "aws-0-us-west-1",     # N. California
    "aws-0-eu-central-1",  # Frankfurt
    "aws-0-eu-west-1",     # Ireland
    "aws-0-ap-southeast-1",# Singapore
    "aws-0-ap-northeast-1",# Tokyo
    "aws-0-ap-south-1",    # Mumbai
    "aws-0-sa-east-1",     # Sao Paulo
    "aws-0-ca-central-1",  # Canada
    "aws-0-eu-west-2",     # London
    "aws-0-eu-west-3",     # Paris
]

def resolve_ip_via_ping(hostname):
    try:
        # Windows ping command
        cmd = ["ping", "-n", "1", hostname]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # Look for [1.2.3.4]
        match = re.search(r'\[(\d+\.\d+\.\d+\.\d+)\]', result.stdout)
        if match:
            return match.group(1)
    except Exception:
        return None
    return None

print(f"--- Supabase Deep Discovery ---")
print(f"Project: {project_ref}")

found_host = None

for region in regions:
    hostname = f"{region}.pooler.supabase.com"
    print(f"\nChecking Region: {region} ({hostname})")
    
    # 1. Resolve IP using System (Bypass Python DNS issues)
    ip = resolve_ip_via_ping(hostname)
    if not ip:
        print(f"  [SKIP] Could not resolve IP via ping.")
        continue
    
    print(f"  [INFO] Resolved IP: {ip}")
    
    # 2. Connection Attempt
    try:
        dsn = f"dbname='postgres' user='{user_fmt}' host='{ip}' port='6543' password='{password_raw}'"
        conn = psycopg2.connect(dsn, connect_timeout=3)
        conn.close()
        print(f"  [SUCCESS] CONNECTED TO {region}!")
        found_host = ip
        break
    except Exception as e:
        err_str = str(e).strip()
        if "Tenant or user not found" in err_str:
            print(f"  [FAIL] Tenant not in this region.")
        elif "password authentication failed" in err_str:
            print(f"  [SUCCESS] Project found! (Password incorrect, but region is correct).")
            found_host = ip
            break
        else:
            print(f"  [FAIL] {err_str}")

if found_host:
    print(f"\n!!! FOUND HOST IP: {found_host} !!!")
else:
    print(f"\n[ERROR] Could not find project in any known region.")
