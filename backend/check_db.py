import socket
import psycopg2
import sys
from urllib.parse import quote_plus

# Params
project_ref = "xplxzmcbxpdhkcjpkopm"
password_raw = "aYKHJ6wu!03Pyg2que0P"
password_encoded = quote_plus(password_raw)

hosts = [
    {
        "name": "Pooler (us-east-1)",
        "host": "aws-0-us-east-1.pooler.supabase.com",
        "port": 6543,
        "user": f"postgres.{project_ref}",
        "dbname": "postgres"
    },
    {
        "name": "Direct",
        "host": "db.xplxzmcbxpdhkcjpkopm.supabase.co",
        "port": 5432,
        "user": "postgres",
        "dbname": "postgres"
    }
]

print(f"--- Diagnostic Start ---")
print(f"Project Ref: {project_ref}")

for h in hosts:
    print(f"\nChecking {h['name']} ({h['host']})...")
    
    # 1. DNS Check
    try:
        ip = socket.gethostbyname(h['host'])
        print(f"  [PASS] DNS Resolved: {ip}")
    except Exception as e:
        print(f"  [FAIL] DNS Error: {e}")
        continue

    # 2. Connection Check
    try:
        # Construct DSN
        dsn = f"dbname='{h['dbname']}' user='{h['user']}' host='{h['host']}' port='{h['port']}' password='{password_raw}'"
        print(f"  Attempting connection...")
        conn = psycopg2.connect(dsn, connect_timeout=5)
        conn.close()
        print(f"  [PASS] Connection Successful!")
    except Exception as e:
        print(f"  [FAIL] Connection Error: {e}")

print(f"\n--- Diagnostic End ---")
