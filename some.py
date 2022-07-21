>python #
import subprocess

print subprocess.check_output(["echo", "hi"])
def to_array(s): return s.split()
print subprocess.check_output(to_array("echo hi"))