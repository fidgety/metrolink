scp ./metrolink.tar.gz root@139.59.169.252:/var/metrolink &&
ssh root@139.59.169.252 << EOF
    stop metrolink &&
    cd /var/metrolink &&
    tar xvzf metrolink.tar.gz &&
    start metrolink
EOF
