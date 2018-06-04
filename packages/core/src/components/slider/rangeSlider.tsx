/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { AbstractPureComponent } from "../../common/abstractPureComponent";
import * as Errors from "../../common/errors";
import { Intent } from "../../common/intent";
import { ISliderBaseProps, MultiSlider } from "./multiSlider";
import { SliderHandle } from "./sliderHandle";

export type NumberRange = [number, number];

enum RangeIndex {
    START = 0,
    END = 1,
}

export interface IRangeSliderProps extends ISliderBaseProps {
    /**
     * Range value of slider. Handles will be rendered at each position in the range.
     * @default [0, 10]
     */
    value?: NumberRange;

    /** Callback invoked when the range value changes. */
    onChange?(value: NumberRange): void;

    /** Callback invoked when a handle is released. */
    onRelease?(value: NumberRange): void;
}

export class RangeSlider extends AbstractPureComponent<IRangeSliderProps> {
    public static defaultProps: IRangeSliderProps = {
        ...MultiSlider.defaultSliderProps,
        value: [0, 10],
    };

    public static displayName = "Blueprint2.RangeSlider";

    public render() {
        const { value, ...props } = this.props;
        return (
            <MultiSlider {...props}>
                <SliderHandle value={value[RangeIndex.START]} type="start" intentAfter={Intent.PRIMARY} />
                <SliderHandle value={value[RangeIndex.END]} type="end" />
            </MultiSlider>
        );
    }

    protected validateProps(props: IRangeSliderProps) {
        const { value } = props;
        if (value == null || value[RangeIndex.START] == null || value[RangeIndex.END] == null) {
            throw new Error(Errors.RANGESLIDER_NULL_VALUE);
        }
    }
}
