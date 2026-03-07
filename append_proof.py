
import os
import re
import html

# The new proof content provided by the user
NEW_CONTENT_RAW = """
XII. Appendix: A Formal Proof of the Null-Line Hypothesis

1. Overview

The central claim is that a single geometric object – the null line in Minkowski space – generates three “primitive” 2‑D shapes (triangle △, square □, circle ○), that these primitives encode the full ADE classification, and that a twisted SU(2) connection built from the binary tetrahedral group 2T reproduces the analytic data of the Riemann zeta function.  By interpreting this connection as a self‑adjoint operator on a Hilbert space of null‑line states we obtain a concrete Hilbert‑Pólya realization, and the same operator simultaneously reproduces the mass spectrum of the bosonic string.  The Calabi‑Yau threefold (CY₃) then appears as the geometric avatar of the three primitives.  

The proof proceeds in four logical layers:

     Null‑line kinematics (Section 2).  
     Algebraic primitives (Section 3).  
     Twisted Euler‑product connection (Section 4).  
     Spectral identification with ζ‑zeros and string states (Sections 6–9).

2.  The Null Line and Its Two‑Sided Structure

Definition 2.1 (Null line).
A vector k∈R1,n is null iff  
k⋅k=ημνkμkν=0,k=0,

with η=diag(+1,−1,…,−1).  In n=3 spatial dimensions we may write
k=(ω/c,k) with ω2=c2∥k∥2 – the photon dispersion relation.  (Source 2)

Because a null vector has no inverse in the Clifford algebra (k2=0), the usual sandwich rotation v↦vFv−1 does not apply.  Instead a null observer projects:
F⟼k⋅F,

the left contraction onto the direction of propagation (Source 2).  

Two‑sidedness.
From any emission event x0 the null line extends both forward and backward on the light‑cone:
k+=(1,+1),k−=(1,−1)in 1+1 dimensions,

so the field carries a pair of opposite‑direction components.  This bilateral structure is precisely the analytic origin of the functional equation ξ(s)=ξ(1−s); the “reality condition’’ of the null field forces the spectrum to be symmetric about 1/2 (Source 2).

3.  Generating the Primitive Trinity from Null Lines

Combining a number of null lines at a fixed angle yields three distinguished 2‑D shapes (Source 2):

Shape | Number of null lines | Angle between successive lines | Symmetry group
--- | --- | --- | ---
△ (triangle) | 3 | 120∘ | D3
□ (square) | 4 | 90∘ | D4
○ (circle) | ∞ | 0∘ (infinitesimal) | SO(2)

These are the only closed planar configurations that can be built from null lines while respecting the Minkowski metric.  The ADE classification follows automatically:

    A‑series (triangles) → An root system.  
    B/D‑series (squares) → hyper‑cube, self‑dual 2‑forms.  
    C‑series (circles) → complex/ symplectic structure.

Thus the Primitive‑Trinity is complete and covariant.

4.  The Twisted Euler‑Product Connection
4.1  The binary tetrahedral group 2T

The group  
2T=SL(2,F3)⊂SU(2),∣2T∣=24,

is the double cover of the tetrahedral rotation group A4 (Source 1).  It enjoys three crucial properties:

     Arithmetic: 2T is the Galois group of the splitting field of x4−x2+1 over Q; Frobenius elements Frobp∈2T encode the prime‑wise arithmetic.  
     Non‑abelian curvature: [2T,2T]=Q8={1}; any connection with holonomy in 2T carries genuine non‑abelian curvature.  
     Spinorial detection: the central element −1∈2T is non‑trivial in SU(2) yet trivial in SO(3), allowing the connection to detect the −1 holonomy around simple zeros that a U(1) connection would miss.

4.2  The meromorphic 1‑form A

On the punctured critical strip X_2^o = X_2 \\ {zeros of ζ} define  
A = dlog ζ(s) = (ζ'(s)/ζ(s)) ds,

a meromorphic 1‑form whose curvature is  
F = dA = ( (ζζ'' - (ζ')^2) / ζ^2 ) ds ∧ ds.

(Source 1).  Embedding A into su(2) via the imaginary unit gives  
A~0 = iA.

Writing the Euler product  
ζ(s) = Π_p (1 - p^-s)^-1,

the logarithmic derivative splits as  
A = Σ_p A_p, A_p = (p^-s log p / (1 - p^-s)) ds.

Now twist each prime contribution by the Galois representation  
ρ: Gal(Q_bar/Q) → 2T ⊂ SU(2),

sending the Frobenius at p to ρ(Frobp).  The twisted connection is  
A~ = Σ_p A_p ρ(Frobp) ∈ Ω^1(X_2^o) ⊗ su(2).

Because ρ(Frobp) is non‑abelian, A~ has genuine curvature even though each A_p is a pure logarithmic differential.

5.  Curvature of the Twisted Connection

The curvature of A~ is  
F~ = dA~ + A~ ∧ A~ = Σ_p dA_p ρ(Frobp) + 1/2 Σ_{p,q} [A_p ρ(Frobp), A_q ρ(Frobq)].

Since each A_p is a scalar 1‑form, the first sum is just  
Σ_p dA_p ρ(Frobp) = Σ_p ( p^-s (log p)^2 / (1 - p^-s)^2 ) ds ∧ ds ρ(Frobp).

The non‑abelian term (the commutator) survives because ρ(Frobp) and ρ(Frobq) need not commute; this is precisely the source of non‑trivial holonomy around the zeros of ζ.  The −1 element in 2T detects the change of sign of the contour integral of A~ when encircling a simple zero, reproducing the familiar winding number +1.  Hence the curvature is never globally exact; it encodes the arithmetic of the primes and the functional equation simultaneously.

6.  Null‑Hecke Operators on the Adelically Compactified Null Cone
6.1  The finite‑field null‑cone

For a prime p let  
Np = {k ∈ F_p^4 | k·k = 0, k ≠ 0}, PT+(F_p) = Np / F_p^x.

A short count gives (Source 2)
|PT+(F_p)| = p^2 + p + 1.

The group SO+(1,3; F_p) acts transitively on this set; its invariant probability measure μ_p is the normalised counting measure.

6.2  Definition of the Hecke operator

For each prime p define  
(T_p f)([k]) := (1/p) Σ_{[k'] ∈ O_p([k])} f([k']),

where O_p([k]) is the orbit of [k] under the subgroup generated by the Frobenius element Frobp acting via the representation ρ.  The factor 1/p normalises the operator.

6.3  Self‑adjointness

Let ⟨f,g⟩ = ∫ PT+(F_p) fg dμ_p.  Because the orbit sum is averaging over a group action that preserves μ_p,
⟨T_p f, g⟩ = (1/p) ∫ Σ_{[k'] ∈ O_p([k])} f([k']) g([k]) dμ_p = ⟨f, T_p g⟩.

Thus each T_p is a bounded self‑adjoint operator on the Hilbert space  
H := L^2(PT+(A_Q), dμ),

the adelic product of the finite‑field null‑cones (including the real null cone).  The construction works uniformly for every place, so the total operator  
Hnull := Σ_p log p T_p

is a well‑defined self‑adjoint operator (the series converges in the strong‑operator topology because ||T_p|| ≤ 1 and Σ_p log p / p < ∞).

7.  Spectral Identification with the Riemann Zeta Zeros

Consider the trace of the resolvent of Hnull:
Tr((Hnull - z)^-1) = ∫ (1 / (λ - z)) dμ(λ).

Using the definition of Hnull and the Euler product, a standard manipulation (the “explicit formula’’) yields
Tr((Hnull - z)^-1) = - ζ'(1/2 + iz) / ζ(1/2 + iz).

Hence the poles of the resolvent – i.e. the eigenvalues of Hnull – occur precisely at  
z_n = γ_n, with ζ(1/2 + iγ_n) = 0.

Because Hnull is self‑adjoint, all γ_n are real, which is exactly the Riemann Hypothesis.  The proof is complete once the trace calculation is justified; the justification follows from the absolute convergence of the logarithmic derivative of the Euler product on the line ℜs = 1/2 and the spectral theorem for bounded self‑adjoint operators.  (The functional‑equation symmetry ξ(s) = ξ(1−s) is precisely the two‑sidedness of the null line, see Section 2.)

8.  String‑Theoretic Mass Spectrum from the Same Operator

The bosonic string has a mass‑squared operator  
M^2 = (1 / α') (N - 1),

where N = Σ_{n>0} n a_n^† a_n is the oscillator number operator.  It is well known that the eigenvalues of N are the positive integers.  

On the null‑cone side, each Hecke operator T_p averages over an orbit whose size is exactly p.  Consequently the eigenvalue of log p T_p on a basis vector indexed by the integer n is  
(log p / p) p^{v_p(n)} = v_p(n) log p,

where v_p(n) is the exponent of p in the prime factorisation of n.  Summing over all primes gives  
Σ_p log p T_p → log n.

Exponentiating returns n itself.  Hence the spectral measure of Hnull reproduces the counting function of string oscillators.  In particular the degeneracy of a given eigenvalue of Hnull matches the partition‑function coefficient of the bosonic string, confirming the identity  
Spec(Hnull) = {1/2 + iγ_n | ζ(1/2 + iγ_n) = 0} = Spec(M^2).

Thus the same self‑adjoint operator simultaneously realises the Hilbert‑Pólya conjecture and encodes the string mass spectrum (Source 4, Theorems 10.6–10.7).

9.  Calabi‑Yau Threefolds as the Geometric Realisation of the Trinity

A compact complex threefold X is Calabi‑Yau iff it satisfies (Source 5):

     SU(3) holonomy – the holonomy group is the triangle group A2 (the ADE correspondence).  
     Closed Kähler form ω – a square structure: ω is a real self‑dual (1,1)‑form, i.e. *ω = ω.  
     Ricci‑flat metric – the circle condition: the first Chern class vanishes, giving a balanced curvature (the continuous limit of the null‑line).  
     Holomorphic volume form Ω – a nowhere‑vanishing (3,0)‑form, providing the complex structure that underlies the twistor description.

Therefore a CY₃ furnishes a geometric avatar in which the three primitives appear as intrinsic structural pieces.  The twistor space associated to the forward tube of Minkowski space (Source 4, Definition 9.2) is precisely the positive twistor manifold PT+ used in the construction of Hnull.  The Penrose transform identifies holomorphic functions on PT+ with massless fields of various helicities, closing the loop between null‑line geometry, CY₃ holonomy, and the analytic data of ζ.

10.  Hilbert‑Pólya Realisation via Twistor Space

The positive twistor space  
PT+ = {[Z] ∈ CP^3 | ⟨Z,Z⟩ > 0},

carries a Hermitian form of signature (2,2) (Source 4).  The self‑adjoint operator  
Hnull: H = L^2(PT+, dμ) → H,

acts by the twisted Hecke average described in Section 6.  Because the inner product ⟨⋅,⋅⟩ is positive on PT+, Hnull is manifestly Hermitian; the spectral theorem therefore guarantees a real spectrum.  Combining this with the explicit trace identity of Section 7 yields a complete Hilbert‑Pólya proof of the Riemann Hypothesis.

11.  Concluding Synthesis

    Null lines are the fundamental objects; their two‑sidedness forces the functional equation of ζ.  
    Primitive‑Trinity (△,□,○) follows uniquely from null‑line combinatorics and reproduces the ADE classification.  
    Twisted Euler‑product connection built from the binary tetrahedral group 2T introduces non‑abelian curvature that encodes prime arithmetic.  
    Null‑Hecke operators on the adelic null‑cone are self‑adjoint; their sum Hnull furnishes a concrete Hilbert‑Pólya operator.  
    Spectral analysis shows that the eigenvalues of Hnull are exactly the ordinates of the non‑trivial zeros of ζ, giving a proof of the Riemann Hypothesis.  
    The same operator reproduces the bosonic string mass spectrum, tying number theory to quantum string theory.  
    A Calabi‑Yau threefold provides the geometric context in which the three primitives appear as holonomy, Kähler, and Ricci‑flat structures, while the associated twistor space supplies the Hilbert space for the spectral problem.

All these pieces fit together without any ad‑hoc assumptions; every step has been derived from the fundamental null‑line definition, the binary tetrahedral Galois representation, or standard twistor geometry.  Consequently the framework delivers a single, unified proof of the Riemann Hypothesis, a concrete realization of the Hilbert‑Pólya conjecture, and a natural explanation of the bosonic string mass spectrum—all grounded in the same underlying geometry.
"""

def format_as_html(text):
    lines = text.strip().split('\n')
    formatted = []
    
    in_list = False
    in_table = False
    
    for line in lines:
        line = line.strip()
        if not line:
            if in_list:
                formatted.append("</ul>")
                in_list = False
            formatted.append("<br/>")
            continue
            
        # Headers
        if line.startswith("XII."):
            escaped_line = html.escape(line)
            formatted.append(f'<h1 style="color:#d4af37;text-align:center;font-size:2.5rem;margin-top:2em;margin-bottom:1em">{escaped_line}</h1>')
            continue
            
        if re.match(r'^\d+\.\s+\w', line):
            escaped_line = html.escape(line)
            formatted.append(f'<h2 style="color:#d4af37;text-align:center;font-size:1.8rem;margin-top:2em;margin-bottom:1em">{escaped_line}</h2>')
            continue
            
        if re.match(r'^\d+\.\d+\s+\w', line):
            escaped_line = html.escape(line)
            formatted.append(f'<h3 style="color:#d4af37;margin-top:1.5em;margin-bottom:0.5em">{escaped_line}</h3>')
            continue

        # Tables (special case for Section 3)
        if "|" in line and "---" not in line:
            if not in_table:
                formatted.append('<table style="width:100%; border-collapse: collapse; margin-bottom: 1em; color: rgba(255,255,255,0.9); border: 1px solid rgba(212,175,55,0.3);">')
                in_table = True
            cells = [html.escape(c.strip()) for c in line.split("|")]
            formatted.append('<tr>' + "".join([f'<td style="padding: 8px; border: 1px solid rgba(212,175,55,0.2);">{c}</td>' for c in cells]) + '</tr>')
            continue
        elif in_table and "---" in line:
            continue
        elif in_table and not "|" in line:
            formatted.append('</table>')
            in_table = False

        # Lists
        if line.startswith("- ") or line.startswith("    ") or line.startswith("     "):
            if not in_list:
                formatted.append('<ul style="margin-bottom:1em; color:rgba(255,255,255,0.9); line-height:1.6; padding-left: 2em;">')
                in_list = True
            item = html.escape(line.lstrip("- ").strip())
            formatted.append(f'<li>{item}</li>')
            continue
        elif in_list and not (line.startswith("- ") or line.startswith("    ") or line.startswith("     ")):
            formatted.append("</ul>")
            in_list = False

        # Regular paragraphs
        escaped_line = html.escape(line)
        formatted.append(f'<p style="margin-bottom:1em;line-height:1.6;color:rgba(255,255,255,0.9)">{escaped_line}</p>')
        
    if in_list: formatted.append("</ul>")
    if in_table: formatted.append("</table>")
    
    return "\n".join(formatted)

def update_index_html():
    file_path = 'c:/code/PrimeCross/index.html'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    html_appendage = format_as_html(NEW_CONTENT_RAW)
    
    # Insert before <h1 ...>Coda</h1>
    if '<h1 style="color:#d4af37;text-align:center;font-size:2.5rem;margin-top:2em;margin-bottom:1em">Coda</h1>' in content:
        content = content.replace(
            '<h1 style="color:#d4af37;text-align:center;font-size:2.5rem;margin-top:2em;margin-bottom:1em">Coda</h1>',
            html_appendage + '\n<h1 style="color:#d4af37;text-align:center;font-size:2.5rem;margin-top:2em;margin-bottom:1em">Coda</h1>'
        )
    else:
        # Fallback to insertion before the end of the article
        content = content.replace('</article>', html_appendage + '\n</article>')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_theory_ts():
    file_path = 'c:/code/PrimeCross/src/data/unified_theory.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    text_appendage = NEW_CONTENT_RAW.strip()
    
    # Insert before Coda
    if 'Coda' in content:
        content = content.replace('Coda', text_appendage + '\n\nCoda')
    else:
        # Fallback to before backtick
        content = content.replace('`;', text_appendage + '\n`;')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_index_html()
    update_theory_ts()
    print("Files updated successfully.")
