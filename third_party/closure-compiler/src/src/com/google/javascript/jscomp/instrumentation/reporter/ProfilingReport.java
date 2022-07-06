/*
 * Copyright 2020 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.javascript.jscomp.instrumentation.reporter;

import static java.util.stream.Collectors.joining;

import com.google.common.annotations.GwtIncompatible;
import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.instrumentation.reporter.proto.FileProfile;
import com.google.javascript.jscomp.instrumentation.reporter.proto.InstrumentationPoint;
import com.google.javascript.jscomp.instrumentation.reporter.proto.InstrumentationPointStats;
import com.google.javascript.jscomp.instrumentation.reporter.proto.ReportProfile;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * A class that maintains all information about the production instrumentation results which will be
 * converted to a JSON.
 */
@GwtIncompatible
final class ProfilingReport {

  /**
   * This function takes the instrumentationMapping and reports sent by the instrumented production
   * code and creates a ProfilingReport with the aggregated information. See return value docs for
   * format.
   *
   * @param instrumentationMapping The instrumentationMapping generated by the Production
   *     Instrumentation pass
   * @param allInstrumentationReports A list off all reports sent by the instrumented production
   *     code
   * @return String containing tab separated table of all instrumentation point in the the binary
   *     with the data agrregated from provided reports. Each row represents separate
   *     instrumentation point. That table can be pasted to google sheets for further analysis.
   */
  public static String createTabSeparatedProfilingReport(
      Map<String, InstrumentationPoint> instrumentationMapping,
      ImmutableList<Map<String, Long>> allInstrumentationReports) {

    List<ReportProfile> profiles =
        allInstrumentationReports.stream()
            .map((report) -> ReportDecoder.decodeReport(instrumentationMapping, report))
            .collect(Collectors.toList());

    Map<InstrumentationPoint, InstrumentationPointMetrics> metrics =
        instrumentationMapping.values().stream()
            .collect(
                Collectors.toMap(
                    Function.identity(), (point) -> new InstrumentationPointMetrics()));

    for (ReportProfile profile : profiles) {
      for (FileProfile fileProfile : profile.getFileProfileList()) {
        for (InstrumentationPointStats pointStats :
            fileProfile.getInstrumentationPointsStatsList()) {
          InstrumentationPointMetrics metric = metrics.get(pointStats.getPoint());
          metric.totalTimesExecuted += pointStats.getTimesExecuted();
          metric.numberOfReports++;
        }
      }
    }

    // Sort instrumentation points in the following order.
    // 1. First by file name so that we get grouped by file points.
    // 2. Within file first put the most frequencly executed points.
    List<Map.Entry<InstrumentationPoint, InstrumentationPointMetrics>> result =
        new ArrayList<>(metrics.entrySet());
    Collections.sort(
        result,
        Comparator.comparing(
                (Map.Entry<InstrumentationPoint, InstrumentationPointMetrics> point) ->
                    point.getKey().getFileName())
            .thenComparingLong(
                (Map.Entry<InstrumentationPoint, InstrumentationPointMetrics> point) ->
                    -point.getValue().totalTimesExecuted)
            .thenComparingInt(
                (Map.Entry<InstrumentationPoint, InstrumentationPointMetrics> point) ->
                    point.getKey().getLineNumber())
            .thenComparingInt(
                (Map.Entry<InstrumentationPoint, InstrumentationPointMetrics> point) ->
                    point.getKey().getType().getNumber()));

    // Build tab-separate table.
    List<List<String>> output = new ArrayList<>();
    // Header row.
    output.add(
        ImmutableList.of(
            "File", "Function name", "Line", "Type", "Total executed", "Reports occured"));
    // Body rows.
    for (Map.Entry<InstrumentationPoint, InstrumentationPointMetrics> entry : result) {
      output.add(
          ImmutableList.of(
              entry.getKey().getFileName(),
              entry.getKey().getFunctionName(),
              String.valueOf(entry.getKey().getLineNumber()),
              entry.getKey().getType().name(),
              String.valueOf(entry.getValue().totalTimesExecuted),
              String.valueOf(entry.getValue().numberOfReports)));
    }

    return output.stream().map((row) -> String.join("\t", row)).collect(joining("\n"));
  }

  /** Metrics collected for particular InstrumentationPoint across all reports. */
  private static class InstrumentationPointMetrics {
    private long totalTimesExecuted = 0;
    private int numberOfReports = 0;
  }
}