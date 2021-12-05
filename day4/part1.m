function part1(boards, values)
  % start playing part 1
  result = zeros(size(boards));
  skipboards = zeros(1, size(boards, 3));
  for v = values 
    v
    for i = 1:size(boards, 3)
      result(:,:,i) = result(:,:,i) + (boards(:,:,i) == v);
      boardnum = checkwinner(result, skipboards);
      if boardnum != -1
        score = sum(sum(boards(:,:,boardnum).*(result(:,:,boardnum) == 0)))*v
        return
      end
    end
  end
end