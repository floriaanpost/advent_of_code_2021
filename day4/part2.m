function part2(boards, values) 
  % start playing part 2
  result = zeros(size(boards));
  skipboards = zeros(1, size(boards, 3));
  for v = values 
    v
    for i = 1:size(boards, 3)
      result(:,:,i) = result(:,:,i) + (boards(:,:,i) == v);
      boardnum = checkwinner(result, skipboards);
      if boardnum != -1
        if sum(skipboards) < size(boards, 3) - 1
          % mark board to be skipped
          skipboards(i) = 1;
        else
          score = sum(sum(boards(:,:,boardnum).*(result(:,:,boardnum) == 0)))*v
          return
        end
      end
    end
  end
end