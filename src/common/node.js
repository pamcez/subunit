export function node() {
  console.log("node method this", this);
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var nodeGroup = group[i];
      if (nodeGroup) {
        return nodeGroup;
      }
    }
  }
  return null;
}
