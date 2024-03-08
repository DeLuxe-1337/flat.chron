var Module = {
    Runtime: {},
}

const Runtime = Module.Runtime

function DefineChronBackendFunctions() {
    Runtime.c_obj_type = Module.cwrap("c_object_type", "int", ["*"], null)
    Runtime.c_string = Module.cwrap("c_string", "string", ["*"], null)
    Runtime.c_int = Module.cwrap("c_int", "number", ["*"], null)
    Runtime.c_bool = Module.cwrap("c_bool", "bool", ["*"], null)
    Runtime.c_table_size = Module.cwrap("c_table_size", "number", ["*"], null)
    Runtime.c_table_key = Module.cwrap("c_table_key", "*", ["number", "*"], null)
    Runtime.c_table_value = Module.cwrap("c_table_value", "*", ["number", "*"], null)
    Runtime.string = Module.cwrap("DynString", "*", ["string"], null)
    Runtime.int = Module.cwrap("DynInteger", "*", ["number"], null)
    Runtime.boolean = Module.cwrap("DynBoolean", "*", ["bool"], null)
    Runtime.null = Module.cwrap("DynNil", "*", [], null)
}

Module["onRuntimeInitialized"] = DefineChronBackendFunctions

Runtime["ChronObjectToType"] = function (ptr) {
    switch (Runtime.c_obj_type(ptr)) {
        case 0: return "string";
        case 1: return "boolean";
        case 2: return "number";
        case 3: return "integer";
        case 4: return "nil";
        case 5: return "ptr";
        case 6: return "table";
    }
}

Runtime["ChronObjectToObject"] = function(ptr) {
    switch(Runtime.ChronObjectToType(ptr)) {
        case "string": return Runtime.c_string(ptr);
        case "integer": return Runtime.c_int(ptr);
        case "boolean": return Runtime.c_bool(ptr);
        case "nil": return null;
        case "table": {
            var table = {}

            for (let i = 0; i < Runtime.c_table_size(ptr); i++) {
                var index = Runtime.c_table_key(i, ptr);
                var value = Runtime.c_table_value(i, ptr);

                table[Runtime.ChronObjectToObject(index)] = Runtime.ChronObjectToObject(value)
            }

            return table
        }
    }
}