<?php

$filename = "./input";

$file = fopen($filename, "r") or die("Could not open file...");
$data = fread($file, filesize($filename));
fclose($file);

$lines = explode("\n", $data);

// part1($lines);
part2($lines);

function part1($lines) {
  $gamma_rate = 0;
  $mask = 0;
  for ($i = 0; $i < strlen($lines[0]); $i++) {
    $count = array_reduce($lines, make_ones_counter($i), 0);
    $bit = $count > count($lines) / 2;
    $gamma_rate = ($gamma_rate << 1) | $bit;
    $mask = ($mask << 1) | 0b1;
  }

  $epsilon_rate = $gamma_rate ^ $mask;
  print($gamma_rate*$epsilon_rate);
}

function part2($lines) {
  function find_value($lines, $least) {
    $pos = 0;
    $left_lines = $lines;
    while (count($left_lines) > 1) {
      $count = array_reduce($left_lines, make_ones_counter($pos), 0);
      if ($least) {
        $bit = $count < count($left_lines) / 2;
      } else {
        $bit = $count >= count($left_lines) / 2;
      }
      $left_lines = array_filter($left_lines, make_measurement_filter($pos, $bit));
      $pos++;
    }
    return bindec(array_values($left_lines)[0]);
  }
  print(find_value($lines, true)*find_value($lines, false));

}

function make_ones_counter($pos){
  return function ($count, $line) use ($pos) { 
    return $line[$pos] == '1' ? $count + 1 : $count;
  };
}

function make_measurement_filter($pos, $bit) {
  return function ($line) use ($pos, $bit) {
    return (int)$line[$pos] == $bit;
  };
}

?>