clc 
clear all

% read input
input = fileread('input');
parts = strsplit(input, '\n\n');

% get values
values = sscanf(char(parts(1)), '%d,', [1, Inf]);

% get boards
boards = [];
for i = 2:length(parts)
  boards(:, :, i - 1) = sscanf(char(parts(i)), '%d ', [5, 5])';
end

% part1(boards, values)
part2(boards, values)