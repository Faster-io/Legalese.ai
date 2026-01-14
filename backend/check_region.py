import socket
import psycopg2
import sys

# Params
project_ref = "xplxzmcbxpdhkcjpkopm"
password_raw = "aYKHJ6wu!03Pyg2que0P"
user_fmt = f"postgres.{project_ref}"

regions = [
    "aws-0-us-east-1",     # Virginia (Default)
    "aws-0-us-west-1",     # California
    "aws-0-eu-central-1",  # Frankfurt
    "aws-0-eu-west-1",     # Ireland
    "aws-0-ap-southeast-1",# Singapore
    "aws-0-sa-east-1",     # Sao Paulo
]

print(f"--- Region Discovery Diagnostic ---")
print(f"Project Ref: {project_ref}")
print(f"User: {user_fmt}")

for region in regions:
    host = f"{region}.pooler.supabase.co"
    print(f"\nChecking Region: {region} ({host})...")
    
    # 1. DNS Check
    try:
        ip = socket.gethostbyname(host)
        print(f"  [PASS] DNS Resolved: {ip}")
    except Exception as e:
        print(f"  [FAIL] DNS Error: {e}")
        continue

    # 2. Connection Check
    try:
        dsn = f"dbname='postgres' user='{user_fmt}' host='{host}' port='6543' password='{password_raw}'"
        conn = psycopg2.connect(dsn, connect_timeout=3)
        conn.close()
        print(f"  [SUCCESS] Connection ESTABLISHED!")
        # Stop on first success
        print(f"  !!! FOUND CORRECT REGION: {region} !!!")
        break
    except Exception as e:
        err_str = str(e).strip()
        if "Tenant or user not found" in err_str:
             print(f"  [FAIL] Tenant not found in this region.")
        elif "password authentication failed" in err_str:
             print(f"  [FAIL] Password incorrect (but specific region found!).") # This likely means we found the region but pass is wrong
        else:
             print(f"  [FAIL] Error: {err_str}")

print(f"\n--- Diagnostic End ---")
