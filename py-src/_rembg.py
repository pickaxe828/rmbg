try:
    import os
    import sys
    import json

    from rembg import remove
except Exception as e:
    print(f"Import error caught: {e}")

try:
    input_path = sys.argv[1]
    output_path = sys.argv[2]
except Exception as e:
    if isinstance(e, IndexError):
        # lol glad that I catch this bug
        print("_rembg.exe or _rembg.py is not directly executable. Arguments required.")
        sys.exit(0)
    else:
        print(f"Unexpected error caught: {e}")
        sys.exit(0)

try: 
    alpha_mat = True
    alpha_mat_num = int(sys.argv[3][1:])
except Exception as e:
    if isinstance(e, IndexError):
        alpha_mat = False
        alpha_mat_num = 0

def _remove(inp, out):
    with open(inp, 'rb') as i:
        with open(out, 'wb') as o:
            _input = i.read()
            output = remove(_input, alpha_matting=alpha_mat,
                            alpha_matting_erode_size=alpha_mat_num)
            o.write(output)

print(json.dumps({
    "message": "init",
    "inputPath": input_path,
    "outputPath": output_path
}))

if os.path.isdir(input_path) and os.path.isdir(output_path):
    files = os.listdir(input_path)
    for index, file in enumerate(files):
        _remove(os.path.join(input_path, file),
                os.path.join(output_path, file[:-4] + ".png"))
        print(json.dumps({
            "message": "processing",
            "current": index + 1,
            "total": len(files)
        }))

print(json.dumps({
    "message": "done"
}))

sys.exit(0)
