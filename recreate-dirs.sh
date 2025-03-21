#!/usr/bin/bash
rm -rf ors-docker
wget https://download.geofabrik.de/europe/germany/brandenburg-latest.osm.pbf -O brandenburg.osm.pbf
mkdir -p ors-docker/config ors-docker/elevation_cache ors-docker/files ors-docker/graphs ors-docker/logs
mv brandenburg.osm.pbf ors-docker/files/brandenburg.osm.pbf
