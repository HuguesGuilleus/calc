#!/bin/bash
# GUILLEUS Hugues <hugues.guilleus@ens.uvsq.fr>

echo $(( `echo $* | sed 's#x#\*#g'` ))
