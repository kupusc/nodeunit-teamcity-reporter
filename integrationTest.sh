#!/usr/bin/env bash

# utitlities used by the run-all executable

# color echos
if [[ -t 1 ]]
then
    # normal
    n='\e[0;0;0m'
    k='\e[0;30m'
    r='\e[0;31m'
    g='\e[0;32m'
    y='\e[0;33m'
    b='\e[0;34m'
    m='\e[0;35m'
    c='\e[0;36m'
    w='\e[0;37m'

    # bright
    N='\e[1m'
    K='\e[1;30m'
    R='\e[1;31m'
    G='\e[1;32m'
    Y='\e[1;33m'
    B='\e[1;34m'
    M='\e[1;35m'
    C='\e[1;36m'
    W='\e[1;37m'
fi


RET_VAL=0

INDENTAION=""

declare _test_case_no=0

_make_absolute_path()
{
    readlink -m $1
}

RET_VAL=0

INDENTAION="  "

_info()
{
    echo -e "${G}[info] ${g}${@}${n}"
}

_warning()
{
    echo -e "${Y}[warning] ${y}${@}${n}"
}

_test_case()
{
    description="$1"
    command_to_execute="${2}"
    echo
    echo -e "${B}[test case $((_test_case_no))] ${b}$description${n}"
    echo "${INDENTAION}${command_to_execute}"
    set +e
    bash -c "${command_to_execute}" > log 2>&1
    rc=$?
    if [ $rc -ne 0 ]; then
        cat log
        tar -cJf log.xz log
        echo -e "${INDENTAION}${R}Error, ${r}command exit code: $rc ${n}"
        exit $rc
    fi
    cat log
    ((_test_case_no++))
    set -e
}

x_test_case()
{
    description="$1"
    command_to_execute="${2}"
    echo
    echo -e "${B}[test case $((_test_case_no))] ${b}$description${n}"
    echo "${INDENTAION}skipped"
}

_test_case "Unit tests must pass" "./node_modules/.bin/nodeunit ./indexTest.js"
_test_case "Real example" "./node_modules/.bin/nodeunit --reporter $(_make_absolute_path "./index.js") ./exampleTests.js"
