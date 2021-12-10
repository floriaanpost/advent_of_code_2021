#include <stdio.h>
#include <stdlib.h>

#define REGULAR_BR "()"
#define SQUARE_BR "[]"
#define CURLY_BR "{}"
#define ANGLE_BR "<>"

const char *filename = "input";

static char get_close_char(char c)
{
  switch (c)
  {
  case REGULAR_BR[0]:
    return REGULAR_BR[1];
  case SQUARE_BR[0]:
    return SQUARE_BR[1];
  case CURLY_BR[0]:
    return CURLY_BR[1];
  case ANGLE_BR[0]:
    return ANGLE_BR[1];
  default:
    return 0;
  }
}

static int get_value_part1(char c)
{
  switch (c)
  {
  case REGULAR_BR[1]:
    return 3;
  case SQUARE_BR[1]:
    return 57;
  case CURLY_BR[1]:
    return 1197;
  case ANGLE_BR[1]:
    return 25137;
  default:
    return 0;
  }
}

static int get_value_part2(char c)
{
  switch (c)
  {
  case REGULAR_BR[1]:
    return 1;
  case SQUARE_BR[1]:
    return 2;
  case CURLY_BR[1]:
    return 3;
  case ANGLE_BR[1]:
    return 4;
  default:
    return 0;
  }
}

static int parse_line(char *line, size_t len, char *expected, size_t *exp_len)
{
  *exp_len = 0;
  char c;
  for (size_t i = 0; i < len; i++)
  {
    if (line[i] == '\n') // skip the newline character at the end (but not on last line)
      continue;
    if ((c = get_close_char(line[i]))) // is an open character!
    {
      expected[(*exp_len)++] = c;
    }
    else // is a close character
    {
      if (*exp_len <= 0 || expected[(*exp_len) - 1] != line[i])
        return i;
      else
      {
        (*exp_len)--;
      }
    }
  }
  return -1;
}

static void sort_array(uint64_t *arr, size_t arr_len)
{
  uint64_t tmp;
  for (int i = 0; i < arr_len; ++i)
  {
    for (int j = i + 1; j < arr_len; ++j)
    {
      if (arr[i] > arr[j])
      {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
}

int main()
{
  FILE *fp = fopen(filename, "r"); // read mode

  size_t line_len;
  char *line;
  int pos;
  int score_part1 = 0;
  size_t closing_brackets_len;
  uint64_t scores_part2[1000]; // large enough, I dont want to count the amount of lines in the file ;)
  size_t scores_part2_pos = 0;
  while ((line = fgetln(fp, &line_len)))
  {
    char closing_brackets[line_len]; // allways large enough
    uint64_t total2 = 0;
    pos = parse_line(line, line_len, closing_brackets, &closing_brackets_len);
    if (pos >= 0)
    { // "syntax" error on line, part 1
      score_part1 += get_value_part1(line[pos]);
    }
    else
    { // just missing brackets at end, part 2
      for (int i = closing_brackets_len - 1; i >= 0; i--)
      {
        total2 = total2 * 5 + (int64_t)get_value_part2(closing_brackets[i]);
      }
      scores_part2[scores_part2_pos++] = total2;
    }
  }
  fclose(fp);

  printf("Part 1: %d\n", score_part1);

  sort_array(scores_part2, scores_part2_pos);
  printf("Part 2: %llu\n", scores_part2[scores_part2_pos / 2]);
}