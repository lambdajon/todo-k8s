
while true; 
do
    siege -p -q -c 10 -t 1s http://192.168.49.2:31372/status
    sleep 2s;
done
