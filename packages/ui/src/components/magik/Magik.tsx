import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  duration: number;
  delay: number;
  heightStart: number;
  heightEnd: number;
}>;

export const EaseInBottom = ({ children, duration, delay, heightStart, heightEnd }: Props) => {
  return (
    <motion.div
      animate={{
        height: [heightStart, heightEnd],
        opacity: [0, 0, 1],
        bottom: [-100, 0],
      }}
      transition={{
        type: "spring",
        damping: 10,
        mass: 0.75,
        stiffness: 100,
        duration,
        repeat: 0,
        delay,
      }}>
      {children}
    </motion.div>
  );
};

// MIT License

// Copyright (c) 2022 RadHaus

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.