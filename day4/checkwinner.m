function boardnum = checkwinner(result, skipboards)
  boardnum = -1;
  for i = 1:size(result, 3)   % loop over boards
    if (skipboards(i) == 1)
      continue
    end
    for j = 1:size(result, 1) % loop over rows
      if sum(result(j,:,i)) == size(result, 1)
        disp(["Win on board ", num2str(i), " row ", num2str(j)])
        boardnum = i;
        return
      end
    end
    for j = 1:size(result, 2) % loop over columns
      if sum(result(:,j,i)) == size(result, 2)
        disp(["Win on board ", num2str(i), " column ", num2str(j)])
        boardnum = i;
        return
      end
    end
  end
end