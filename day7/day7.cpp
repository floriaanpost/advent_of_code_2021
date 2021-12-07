#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <limits>
#include <functional>

static std::vector<int> read_input(const char *filename)
{
  std::ifstream input_file(filename);
  std::string number;
  std::vector<int> submarines;

  while (std::getline(input_file, number, ','))
    submarines.push_back(stoi(number));

  return submarines;
}

static int max_value(std::vector<int> v)
{
  int max = 0;
  for (size_t i = 0; i < v.size(); i++)
    if (v[i] > max)
      max = v[i];
  return max;
}

static int min_value(std::vector<int> v)
{
  int min = std::numeric_limits<int>::max();
  for (size_t i = 0; i < v.size(); i++)
    if (v[i] < min)
      min = v[i];
  return min;
}

static int optimize_fuel(std::vector<int> submarines, std::function<int(int distance)> fuel_function)
{
  int max = max_value(submarines);
  std::vector<int> cost;
  for (int altitude = max; altitude >= 0; altitude--)
  {
    int cost_for_altitude = 0;
    for (size_t i = 0; i < submarines.size(); i++)
    {
      cost_for_altitude += fuel_function(abs(submarines[i] - altitude));
    }
    cost.push_back(cost_for_altitude);
  }
  return min_value(cost);
}

int main()
{
  auto submarines = read_input("input");
  auto cost_function1 = [](int distance)
  {
    return distance;
  };
  std::cout << "part 1: " << optimize_fuel(submarines, cost_function1) << std::endl;

  auto cost_function2 = [](int distance)
  {
    return distance * (distance + 1) / 2;
  };

  std::cout << "part 2: " << optimize_fuel(submarines, cost_function2) << std::endl;

  exit(EXIT_SUCCESS);
}
